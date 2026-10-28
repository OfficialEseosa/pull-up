require("dotenv").config(); //loads environment variables from .env file
const bcrypt = require("bcrypt"); //hashes passwords so we never store the real ones
const cors = require("cors"); //lets the React app (a different port) call this server

const express = require("express"); //imports the express module
const app = express(); //creates the express application object
app.use(express.json()); //parses incoming JSON requests
//only the Vite dev server is allowed to call us from the browser
//(CLIENT_ORIGIN can override it, e.g. when the front end runs on another port)
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));

const mysql = require("mysql2"); //uses new mysql package
//connection settings come from .env so the password is never in the code
const conn = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT
    });

//opens the connection and logs whether it worked
conn.connect(function(err)
{
    if(err)
        console.log("Couldnt connect to MySQL",err);
    else
        console.log("Database connection established");

});

//creates a new account from the sign up form
app.post("/register", async (req, res) => {
    const { first_name, last_name, personal_email, school_email, password, confirm_password } = req.body;
    //an empty phone box comes through as "", but the column should be NULL when there's no number
    const phone_number = req.body.phone_number || null;

    //the browser checks these too, but anyone can skip the browser, so check again here
    if (!first_name || !last_name || !personal_email || !school_email || !password)
        return res.status(400).json({ message: "Please fill in every required field." });
    if (password !== confirm_password)
        return res.status(400).json({ message: "The passwords don't match." });
    if (!school_email.toLowerCase().endsWith("@student.gsu.edu"))
        return res.status(400).json({ message: "Use your GSU student email (ends in @student.gsu.edu)." });

    //10 rounds is the usual setting: slow enough to stop guessing, fast enough for one sign up
    //(the async version so the server isn't frozen while it hashes)
    const hashedPassword = await bcrypt.hash(password, 10);

    //the ?s get filled in safely by mysql2, which is what stops SQL injection
    const query = "INSERT INTO users (first_name, last_name, personal_email, school_email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)";
    conn.query(query, [first_name, last_name, personal_email, school_email, phone_number, hashedPassword], (err) => {
        if (err) {
            //both email columns are UNIQUE, so a repeat email lands here
            if (err.code === "ER_DUP_ENTRY")
                return res.status(409).json({ message: "That email is already registered." });
            //log the real error for us, but don't show database details to the user
            console.log("Register failed:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again." });
        }
        res.status(201).json({ message: "You have successfully registered!" });
    });
});

//checks a username (school email) and password against the users table
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    //one message for every failure, so nobody can tell whether an email has an account
    const badLogin = { message: "The login credentials were incorrect." };

    if (!username || !password)
        return res.status(400).json(badLogin);

    const query = "SELECT id, first_name, last_name, school_email, password FROM users WHERE school_email = ?";
    conn.query(query, [username], async (err, rows) => {
        if (err) {
            console.log("Login failed:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again." });
        }
        //no account with that email
        if (rows.length === 0)
            return res.status(401).json(badLogin);

        const user = rows[0];
        //bcrypt hashes what they typed the same way and compares it to the stored hash
        const matches = await bcrypt.compare(password, user.password);
        if (!matches)
            return res.status(401).json(badLogin);

        //send back who they are, but never the password hash
        res.json({
            message: "You have logged in successfully",
            user: { id: user.id, first_name: user.first_name, last_name: user.last_name, school_email: user.school_email },
        });
    });
});

//PORT can be set when testing a second copy; normally it's 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
