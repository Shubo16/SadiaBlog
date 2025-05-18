import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new pg.Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "Sadia's Blog",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
  } else {
    console.log("Connected to database successfully!");
  }
});

// Fetch archived blogs
router.get("/recover-blog", async (req, res) => {
  


  try {
    const result = await db.query(`
    SELECT 
    recover_blog.*, 
    users.username, 
    users.first_name,
    users.last_name,
    users.avatar_url
  FROM recover_blog
  JOIN users ON recover_blog.user_id::integer = users.id
  ORDER BY recover_blog.date_created DESC LIMIT 5 OFFSET 0;
  


      `);
    console.log("Fetched archived blogs:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching archived blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch archived blog by slug
router.get("/recover-blog/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM recover_blog WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Archived blog not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching archived blog by slug:", error);
    res.status(500).json({ error: "Error fetching archived blog" });
  }
});

// Delete an archived blog
router.delete("/recover-blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM recover_blog WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Archived blog not found" });
    }

    await db.query("DELETE FROM recover_blog WHERE id = $1", [id]);
    res.status(200).send(`Archived blog with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting archived blog:", error);
    res.status(500).send("Error deleting archived blog");
  }
});

export default router;
