import { useState } from "react";
import { Link } from "react-router";
import api from "../api.js";

// Sign up page: the Pull Up logo above a form for creating an account
function SignUp() {
    // error holds the server's message when something's wrong; registered flips once it works
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);

    async function handleSubmit(event) {
        // stop the browser from reloading the page like a normal form would
        event.preventDefault();
        setError("");

        // turns the form into { first_name: "...", last_name: "...", ... } using each input's name
        const data = Object.fromEntries(new FormData(event.target));

        // quick check before bothering the server (the server checks again anyway)
        if (data.password !== data.confirm_password) {
            setError("The passwords don't match.");
            return;
        }

        try {
            await api.post("/register", data);
            setRegistered(true);
        } catch (err) {
            // the server sends { message } for errors it knows about; anything else is a network problem
            setError(err.response?.data?.message || "Couldn't reach the server. Is it running?");
        }
    }

    return (
        // Full-screen wrapper that centers the logo and the form
        <div className="auth-page">
            {/* Logo: the dot is wrapped in a span so it can be colored orange */}
            <h1>Pull Up<span className="dot">.</span></h1>

            {registered ? (
                // once they're signed up, swap the form for a success message
                <div className="data-form">
                    <h2>You have successfully registered!</h2>
                    <p>Your account is ready. <Link to="/login">Log in here</Link></p>
                </div>
            ) : (
                <form className="data-form" onSubmit={handleSubmit}>
                    <h2>Sign Up for Pull Up</h2>
                    <p>Already have an account? <Link to="/login">Log In</Link></p>
                    {/* Each input's name matches its column in the users table */}
                    <label>First Name: <input type="text" name="first_name" autoComplete="given-name" required/></label>
                    <label>Last Name: <input type="text" name="last_name" autoComplete="family-name" required/></label>
                    <label>Personal Email: <input type="email" name="personal_email" autoComplete="email" required/></label>
                    <label>School Email: <input type="email" name="school_email" placeholder="jdoe1@student.gsu.edu" required/></label>
                    {/* Phone is the only optional field (phone_number allows NULL) */}
                    <label>Phone Number (Optional): <input type="tel" name="phone_number" autoComplete="tel"/></label>
                    <label>Password: <input type="password" name="password" autoComplete="new-password" required/></label>
                    {/* Only used to check the password was typed correctly; not saved */}
                    <label>Confirm Password: <input type="password" name="confirm_password" autoComplete="new-password" required/></label>
                    {/* only shows up when there's something to say */}
                    {error && <p className="form-error">{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
}

export default SignUp;
