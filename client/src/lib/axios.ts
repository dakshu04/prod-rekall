import axios from "axios"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const backendURL = import.meta.env.VITE_BACKEND_URL 
const instance = axios.create({
  baseURL: `{backendURL}/api`, // your backend base URL
  withCredentials: true, // only if you use cookies
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance
