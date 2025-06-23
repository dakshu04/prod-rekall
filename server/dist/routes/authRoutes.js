"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel_1 = require("../models/UserModel");
const crypto_1 = require("crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield UserModel_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const shareLink = (0, crypto_1.randomUUID)();
        const newUser = new UserModel_1.UserModel({
            username,
            email,
            password: hashedPassword,
            shareLink
        });
        yield newUser.save();
        res.status(201).json({
            message: "User created successfully",
            shareLink
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //check if user exists
        const existingUser = yield UserModel_1.UserModel.findOne({
            email
        });
        if (!existingUser) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }
        // ✅ Generate JWT token here
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // signin successfull
        res.status(200).json({
            success: true,
            message: "Login successfull",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                shareLink: existingUser.shareLink
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
