import z from "zod"

export const registerSchema = z.object({
    username: z.string().min(2, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be atleast 4 characters")
})

export type registerSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})
