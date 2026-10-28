import { Routes, Route } from "react-router"
import SignUp from "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"
import Home from "./pages/Home.jsx"

// Maps each URL to the page component it shows
function App() {
  return (
    <Routes>
      {/* Home address (localhost:5173) shows the sign up page */}
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
