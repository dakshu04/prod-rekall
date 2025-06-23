"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userAuth_1 = __importDefault(require("./routes/userAuth")); // Add this import
// Load environment variables from .env
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ Enable CORS for frontend (Vite) running on port 5173
app.use((0, cors_1.default)({
    origin: "https://rekall.vercel.app",
    credentials: true, // only if you're using cookies or auth headers
}));
app.use(express_1.default.json());
// Define PORT from environment or fallback to 3000
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userAuth_1.default);
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
