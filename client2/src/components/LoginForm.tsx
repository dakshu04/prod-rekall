import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { loginSchema } from "../lib/vaidations/zodAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
type LoginFormValues = z.infer<typeof loginSchema>

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// ✅ Accept closeDialog prop just like RegisterForm

export default function LoginForm({ closeDialog }: { closeDialog: () => void }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true)
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, data)
      login(res.data.token) // ✅ stores token and updates context

      // ✅ Store token (assuming token comes as res.data.token)
      localStorage.setItem("token", res.data.token)

      toast.success("✅ Logged in successfully!")

      // ✅ Close modal and redirect
      closeDialog()
      setTimeout(() => {
        navigate("/dashboard")
      }, 500) // Short delay to make the UI feel smooth
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "❌ Login failed")
      } else {
        toast.error("❌ Login failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
