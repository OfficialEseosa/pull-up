import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api.js";

// Log in page: same layout and card as the sign up page
function LogIn() {
    // error is the "credentials were incorrect" message
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        // keep the page from reloading
        event.preventDefault();
        setError("");

        // { username: "...", password: "..." } from the inputs' names
        const data = Object.fromEntries(new FormData(event.target));

        try {
            const response = await api.post("/login", data);
            // remember who logged in so the home page knows (not real security yet, just for now)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            // go to the home page and hand it the "logged in successfully" message
            navigate("/home", { state: { message: response.data.message } });
        } catch (err) {
            setError(err.response?.data?.message || "Couldn't reach the server. Is it running?");
        }
    }

    return (
        <div className="auth-page">
            <h1>Pull Up<span className="dot">.</span></h1>

            {error ? (
                // a failed log in gets its own message with a way back to the form
                <div className="data-form">
                    <h2>{error}</h2>
                    <p><Link to="/login" onClick={() => setError("")}>Back to log in</Link></p>
                </div>
            ) : (
                <form className="data-form" onSubmit={handleSubmit}>
                    <h2>Log In to Pull Up</h2>
                    <p>Don't have an account? <Link to="/">Sign Up</Link></p>
                    {/* there's no username column, so your school email is your username */}
                    <label>Username (School Email): <input type="email" name="username" placeholder="jdoe1@student.gsu.edu" autoComplete="username" required/></label>
                    <label>Password: <input type="password" name="password" autoComplete="current-password" required/></label>
                    <button type="submit">Log In</button>
                </form>
            )}
        </div>
    );
}

export default LogIn;
