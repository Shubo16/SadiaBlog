import express from "express";
import pool from "../config/db.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";

const router = express.Router();
dotenv.config();

// Resolve __dirname for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer for file uploads
const rootDir = path.join(__dirname, "..");
const upload = multer({ dest: path.join(rootDir, "uploads") });


pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.stack);
  } else {
    console.log("Connected to database successfully!");
  }
});

// Fetch all blogs for landing page or other use-cases
router.get("/blog", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        blog.*, 
        users.username, 
        users.first_name,
        users.last_name,
        users.avatar_url,
        COALESCE(like_count.count, 0) AS likes,
        COALESCE(comment_count.count, 0) AS comments
      FROM blog
      JOIN users ON blog.user_id = users.id
      LEFT JOIN (
        SELECT blog_id, COUNT(*) AS count
        FROM likes
        GROUP BY blog_id
      ) like_count ON blog.id = like_count.blog_id
      LEFT JOIN (
        SELECT blog_id, COUNT(*) AS count
        FROM comments
        GROUP BY blog_id
      ) comment_count ON blog.id = comment_count.blog_id
      ORDER BY blog.date_created DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch blog by slug
router.get("/blog/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        blog.*,
        users.username,
        users.first_name,
        users.last_name,
        users.avatar_url
      FROM blog
      JOIN users ON blog.user_id = users.id
      WHERE blog.slug = $1
      ORDER BY blog.date_created DESC
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new blog with optional file upload
router.post("/blog", upload.single("image"), async (req, res) => {
  try {
    const { title, category, description, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const user_id = req.user?.id;

    if (!user_id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not logged in" });
    }

    // create a linebreak on new paragraph when pressing enter

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const query = `
      INSERT INTO blog (title, category, description, content, image_path, user_id, slug) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(query, [
      title,
      category,
      description,
      content,
      imagePath,
      user_id,
      slug,
    ]);

    res.status(201).json({ message: "Blog posted successfully!", slug });
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the blog" });
  }
});

// Archive a blog
router.post("/blog/archive/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Archiving blog with ID:", id); // ✅ add this

  try {
    // 1️⃣ Get the blog data
    const blogResult = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);

    if (blogResult.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const blog = blogResult.rows[0];

    // 2️⃣ Get the user data (full user object)
    const userResult = await pool.query(
      "SELECT username, first_name, last_name, avatar_url, email FROM users WHERE id = $1",
      [blog.user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }

    const user = userResult.rows[0];

    // 3️⃣ Insert into recover_blog (store full user data)
    await pool.query(
      `INSERT INTO recover_blog 
        (user_id, title, category, description, content, image_path, date_created)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        blog.user_id, // Just store user_id instead of author
        blog.title,
        blog.category,
        blog.description,
        blog.content,
        blog.image_path,
        blog.date_created,
      ]
    );

    // 4️⃣ Delete from blog table
    await pool.query("DELETE FROM blog WHERE id = $1", [id]);

    res.status(200).json({ message: "Blog archived successfully" });
  } catch (error) {
    console.error("Error archiving blog:", error);
    res.status(500).json({ error: "Failed to archive blog" });
  }
});

router.get("/blog", async (req, res) => {
  console.log("GET /api/blog called");
  try {
    const result = await pool.query("SELECT 1");
    console.log("pool test query success:", result.rows);
    // Then do your real query here
    // ...
  } catch (err) {
    console.error(err);
  }
});

export default router;
