// models/ContentModel.ts
import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tag: { type: String, enum: ["youtube", "twitter"], required: true },
    link: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const ContentModel = mongoose.model("Content", ContentSchema);
