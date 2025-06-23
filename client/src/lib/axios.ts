import axios from "axios"

const backendURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: `${backendURL}/api`, // ✅ Correct string interpolation
  withCredentials: true,         // Optional: Only needed if you use cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
