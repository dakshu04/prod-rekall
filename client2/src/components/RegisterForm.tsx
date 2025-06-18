// src/components/RegisterForm.tsx

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { registerSchema } from "@/lib/vaidations/zodAuth" // ✅ Adjust path if needed
import { useNavigate } from "react-router-dom"

// Infer the form type from your Zod schema
type RegisterFormValues = z.infer<typeof registerSchema>

// Props passed from the parent (used to close the dialog)
type Props = {
  closeDialog: () => void
}

// Base URL for backend API from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function RegisterForm({ closeDialog }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true)

      await axios.post(`${API_BASE_URL}/api/auth/signup`, data)

      // Show success toast
      toast.success("🎉 User registered successfully!")

      // Close the modal and reset the form
      closeDialog()
      reset()
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    } catch (error: unknown) {
      // Handle errors with fallback message
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "❌ Registration failed")
      } else {
        toast.error("❌ Registration failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Username" {...register("username")} />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  )
}
