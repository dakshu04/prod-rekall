  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import { connectDB } from './config/db'
  import authRoutes from "./routes/authRoutes"
  import userRoutes from "./routes/userAuth"; // Add this import
  // Load environment variables from .env
  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Define PORT from environment or fallback to 3000
  const PORT = process.env.PORT;

  app.use("/api/auth", authRoutes);

  app.use("/api/user", userRoutes);

  connectDB()

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
