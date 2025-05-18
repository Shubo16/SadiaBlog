import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import pool from "../config/db.js"; // ← your PostgreSQL pool

const router = express.Router();
const upload = multer({ dest: "./uploads" });

router.post("/upload-avatar/:id", upload.single("avatar"), async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
    });

    fs.unlinkSync(req.file.path); // remove local file
    const imageUrl = result.secure_url;
    console.log(`✅ Avatar uploaded: ${imageUrl}`);

    // Save avatar URL to database
    await pool.query("UPDATE users SET avatar_url = $1 WHERE id = $2", [
      imageUrl,
      userId,
    ]);
    console.log(`📦 Updated DB for user ID: ${userId}`);
    res.status(200).json({ imageUrl, message: "Avatar uploaded and saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
