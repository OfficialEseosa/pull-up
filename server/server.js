require("dotenv").config(); //loads environment variables from .env file

const express = require("express"); //imports the express module
const app = express(); //creates the express application object
app.use(express.static("public"));//register public as the directory for static files

const mysql = require("mysql2"); //uses new mysql package
const conn = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT
    });

conn.connect(function(err)
{
    if(err)
        console.log("Couldnt connect to MySQL",err);
    else
        console.log("Database connection established");
    
});
app.listen(3000);