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
const middlewareAuth_1 = require("../middlewares/middlewareAuth");
const ContentModel_1 = require("../models/ContentModel");
const router = express_1.default.Router();
// Protected route: GET /api/user/me
router.get("/me", middlewareAuth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.UserModel.findById(req.userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Fetch user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Protected route: POST /api/user/content/add
router.post("/content/add", middlewareAuth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, tag, link } = req.body;
        if (!title || !tag || !link) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }
        const content = new ContentModel_1.ContentModel({
            title,
            description,
            tag,
            link,
            userId: req.userId // from JWT middleware
        });
        yield content.save();
        res.status(201).json({
            message: "Content added successfully",
            content
        });
    }
    catch (error) {
        console.error("Add content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/content/all", middlewareAuth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield ContentModel_1.ContentModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Fetched user content successfully",
            contents
        });
    }
    catch (error) {
        console.error("Fetch content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.put("/content/edit/:id", middlewareAuth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, tag, link } = req.body;
        const content = yield ContentModel_1.ContentModel.findOneAndUpdate({ _id: id, userId: req.userId }, { title, description, tag, link }, { new: true });
        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        res.status(200).json({
            message: "Content updated successfully",
            content
        });
    }
    catch (error) {
        console.error("Update content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete("/content/delete/:id", middlewareAuth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const content = yield ContentModel_1.ContentModel.findOneAndDelete({ _id: id, userId: req.userId });
        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        res.status(200).json({
            message: "Content deleted successfully"
        });
    }
    catch (error) {
        console.error("Delete content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
