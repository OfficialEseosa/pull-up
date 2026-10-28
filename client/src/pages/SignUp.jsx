// Sign up page: the Pull Up logo above a form for creating an account
function SignUp() {
    return (
        // Full-screen wrapper that centers the logo and the form
        <div className="signup">
            {/* Logo: the dot is wrapped in a span so it can be colored orange */}
            <h1>Pull Up<span className="dot">.</span></h1>
            <form className="data-form">
                <h2>Sign Up for Pull Up</h2>
                <p>Already have an account? <a href="/login">Log In</a></p>
                {/* Each input's name matches its column in the users table */}
                <label>First Name: <input type="text" name="first_name" required/></label>
                <label>Last Name: <input type="text" name="last_name" required/></label>
                <label>Personal Email: <input type="email" name="personal_email" required/></label>
                <label>School Email: <input type="email" name="school_email" required/></label>
                {/* Phone is the only optional field (phone_number allows NULL) */}
                <label>Phone Number (Optional): <input type="tel" name="phone_number"/></label>
                <label>Password: <input type="password" name="password" required/></label>
                {/* Only used to check the password was typed correctly; not saved */}
                <label>Confirm Password: <input type="password" name="confirm_password" required/></label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
