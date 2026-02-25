// backend/src/controllers/commentController.ts
import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

// Create comment (protected)
export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { productId } = req.params as { productId: string };
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "Comment content is required" });

        // verify product exists
        const product = await queries.getProductById(productId);
        if (!product) return res.status(404).json({ error: "Product not found" });

        const comment = await queries.createComment({
            content,
            userId,
            productId,
        });

        res.status(201).json({ comment });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete comment (protected)
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { commentId } = req.params as { commentId: string };

        const deleted = await queries.deleteComment(commentId);
        if (!deleted) return res.status(404).json({ error: "Comment not found" });

        res.status(200).json({ comment: deleted });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};