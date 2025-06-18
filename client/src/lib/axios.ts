import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // your backend base URL
  withCredentials: true, // only if you use cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
