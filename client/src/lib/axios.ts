// src/lib/axios.ts
import axios from "axios"

const backendURL = import.meta.env.VITE_BACKEND_URL // ✅ this will come from your .env file

const instance = axios.create({
  baseURL: `${backendURL}/api`, // ✅ dynamic usage
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
