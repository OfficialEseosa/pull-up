import { Link } from "react-router";

// Log in page: same layout and card as the sign up page
function LogIn() {
    return (
        <div className="auth-page">
            <h1>Pull Up<span className="dot">.</span></h1>
            <form className="data-form">
                <h2>Log In to Pull Up</h2>
                <p>Don't have an account? <Link to="/">Sign Up</Link></p>
                {/* there's no username column, so your school email is your username */}
                <label>Username (School Email): <input type="email" name="username" placeholder="jdoe1@student.gsu.edu" autoComplete="username" required/></label>
                <label>Password: <input type="password" name="password" autoComplete="current-password" required/></label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;
