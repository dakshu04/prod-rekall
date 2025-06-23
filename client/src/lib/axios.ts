import axios from "axios"



const instance = axios.create({
  baseURL: "https://prod-rekall-fslh.vercel.app/api", // ✅ Correct string interpolation
  withCredentials: true,         // Optional: Only needed if you use cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
