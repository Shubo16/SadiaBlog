import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET: Fetch like count for a blog
router.get("/likes/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const blogResult = await pool.query(`SELECT id FROM blog WHERE slug = $1`, [
      slug,
    ]);

    if (blogResult.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const blogId = blogResult.rows[0].id;

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM likes WHERE blog_id = $1`,
      [blogId]
    );

    const count = parseInt(countResult.rows[0].count, 10);

    res.status(200).json({ count });
  } catch (error) {
    console.error("Failed to fetch like count", error);
    res.status(500).json({ error: "Failed to fetch like count" });
  }
});

// POST: Add a like to a blog
router.post("/likes/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("Incoming POST /api/likes for slug:", slug);

    const blogResult = await pool.query(`SELECT id FROM blog WHERE slug = $1`, [
      slug,
    ]);

    if (blogResult.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const blogId = blogResult.rows[0].id;

    await pool.query(
      `INSERT INTO likes (blog_id, liked)
           VALUES ($1, $2)`,
      [blogId, true]
    );

    // Fetch updated like count
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM likes WHERE blog_id = $1`,
      [blogId]
    );

    const count = parseInt(countResult.rows[0].count, 10);

    res.status(201).json({ message: "Like posted successfully", count });
  } catch (error) {
    console.error("Like not posted", error);
    res.status(500).json({ error: "Failed to post like" });
  }
});

router.delete("/likes/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`[DELETE] Like called for slug: ${slug}`);

    // Fetch blog ID from slug
    const blog = await pool.query(`SELECT id FROM blog WHERE slug = $1`, [
      slug,
    ]);

    const blogId = blog.rows[0]?.id;
    console.log(`[DELETE] Blog ID resolved: ${blogId}`);

    if (!blogId) {
      console.warn(`[DELETE] Blog not found for slug: ${slug}`);
      return res.status(404).json({ error: "Blog not found" });
    }

    // Perform deletion
    const deleteResult = await pool.query(
      `DELETE FROM likes WHERE blog_id = $1`,
      [blogId]
    );

    // After deleting likes, return the new count
    const updatedCount = await pool.query(
      `SELECT COUNT(*) FROM likes WHERE blog_id = $1`,
      [blogId]
    );
    const count = parseInt(updatedCount.rows[0].count, 10);

    res.status(200).json({ message: "Likes cleared", count });
    console.log(`[DELETE] Deleted likes for blog ID: ${blogId}`);
  } catch (error) {
    console.error(`[DELETE] Failed to delete likes:`, error);
    res.status(500).json({ error: "Failed to delete likes" });
  }
});

export default router;
