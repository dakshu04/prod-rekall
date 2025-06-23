import express, { Router } from "express";
import { UserModel } from "../models/UserModel";
import { authenticateToken, AuthRequest } from "../middlewares/middlewareAuth";
import { ContentModel } from "../models/ContentModel";
const router = express.Router()

// Protected route: GET /api/user/me
router.get("/me", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found." });
        return
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route: POST /api/user/content/add
router.post("/content/add", authenticateToken, async (req: AuthRequest, res): Promise<void> => {
    try {
    const { title, description, tag, link } = req.body;

    if (!title || !tag || !link) {
        res.status(400).json({ message: "Missing required fields." });
        return
    }

    const content = new ContentModel({
        title,
        description,
        tag,
        link,
        userId: req.userId // from JWT middleware
    });

    await content.save();

    res.status(201).json({
        message: "Content added successfully",
        content
    });
    } catch (error) {
        console.error("Add content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/content/all", authenticateToken, async (req: AuthRequest, res) : Promise<void> => {
    try {
        const contents = await ContentModel.find({ userId: req.userId }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Fetched user content successfully",
            contents
        });
    } catch (error) {
        console.error("Fetch content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/content/edit/:id", authenticateToken, async (req: AuthRequest, res) : Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, tag, link } = req.body;

        const content = await ContentModel.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, description, tag, link },
            { new: true }
        );

        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return
        }

        res.status(200).json({
            message: "Content updated successfully",
            content
        });
    } catch (error) {
        console.error("Update content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/content/delete/:id", authenticateToken, async (req: AuthRequest, res) : Promise<void> => {
    try {
    const { id } = req.params;

    const content = await ContentModel.findOneAndDelete({ _id: id, userId: req.userId });

    if (!content) {
        res.status(404).json({ message: "Content not found or unauthorized" });
        return
    }

    res.status(200).json({
        message: "Content deleted successfully"
    });
    } catch (error) {
        console.error("Delete content error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




export default router