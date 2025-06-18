import { z } from "zod"

export const registerSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(4, "Enter min of 4 letters")
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, "Enter min of 4 letters")
})