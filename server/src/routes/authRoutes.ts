import express, { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)

        const shareLink = randomUUID();

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            shareLink
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            shareLink
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body

        //check if user exists
        const existingUser = await UserModel.findOne({
            email
        })

        if(!existingUser) {
            res.status(400).json({ message: "User does not exist"})
            return
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch) {
            res.status(400).json({
                message: "Invalid credentials"
            })
            return
        }

        // ✅ Generate JWT token here
        const token = jwt.sign(
            { id: existingUser._id }, process.env.JWT_SECRET as string,
            { expiresIn: "1h" } 
        );

        // signin successfull
        res.status(200).json({
            message: "Login successfull",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                shareLink: existingUser.shareLink
            }
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}) 

export default router; 
