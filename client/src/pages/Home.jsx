import { Navigate, useLocation, useNavigate } from "react-router";

// Home page: where you land after logging in
function Home() {
    const navigate = useNavigate();
    // the log in page passes its success message along when it sends you here
    const location = useLocation();
    const message = location.state?.message;

    // the log in page saves who you are in localStorage; nothing saved means not logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user)
        return <Navigate to="/login" replace />;

    function logOut() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className="home">
            <header className="home-header">
                <span className="home-logo">Pull Up<span className="dot">.</span></span>
                <button type="button" onClick={logOut}>Log Out</button>
            </header>
            <main className="home-main">
                {message && <p className="home-message">{message}</p>}
                <h2>Welcome, {user.first_name}!</h2>
                <p>PIN events and custom plans will show up here soon.</p>
            </main>
        </div>
    );
}

export default Home;
