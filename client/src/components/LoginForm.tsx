"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const backendURL = import.meta.env.VITE_BACKEND_URL

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${backendURL}/api/auth/signin`, {
        email,
        password,
      }, 
        {
            withCredentials: true
        })
        if (response.data.success) {
            toast.success("Logged in successfully ✅")
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        } else {
            toast.error("Login failed ❌ Invalid credentials")
        }
    } catch (err) {
      toast.error("Something went wrong! Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Enter Your Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
