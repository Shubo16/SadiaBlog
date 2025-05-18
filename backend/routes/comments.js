import express from "express";
import pool from "../config/db.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/comments/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const results = await pool.query(
      `SELECT * FROM comments WHERE slug = $1 ORDER BY created_at DESC`,
      [slug]
    );

    res.status(200).json(results.rows); // ✅ send the rows to frontend
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

//post comment

router.post("/comments/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { comment } = req.body;

    const query = `
        INSERT INTO comments (comment, slug)
        VALUES ($1, $2)
        RETURNING *
      `;

    const result = await pool.query(query, [comment, slug]);

    res.status(201).json({
      message: "Comment posted successfully",
      comment: result.rows[0],
    });

    res.status(201).json({ message: "comment posted successfully" });
  } catch (error) {
    console.error("comment not posted", error);
    res.status(500);
  }
});

//delete comment

router.delete("/comments/:id", async (req, res) => {
    const commentId = req.params.id;
  
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  
    try {
      const result = await pool.query(
        "DELETE FROM comments WHERE id = $1 RETURNING *",
        [commentId]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  

export default router;
