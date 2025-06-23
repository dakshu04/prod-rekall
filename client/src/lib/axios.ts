// src/lib/axios.ts
import axios from "axios"

const backendURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: `${backendURL}/api`, // ✅ Correct usage
  withCredentials: true,         // Only needed if your backend sets cookies (optional)
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
