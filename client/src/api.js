import axios from "axios";

// One shared axios setup, so every request goes to the Express server
// without typing the full address each time.
// VITE_API_URL can override the address (handy later when the server isn't on localhost).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export default api;
