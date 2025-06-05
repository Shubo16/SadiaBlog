import express from "express";
import pool from "../config/db.js"; // ✅ Make sure to import your DB connection

const router = express.Router();

// ✅ Route to get the currently logged-in user
router.get("/user", (req, res) => {
  console.log("🔍 Incoming /api/user request");
  console.log("➡️ Headers:", req.headers);
  console.log("🍪 Cookies:", req.cookies);
  console.log("📦 Session:", req.session);
  console.log("👤 User:", req.user);


  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ user: null, message: "Not authenticated" });
  }
});

// ✅ PUT /api/user/:id/avatar - Update avatar
router.put("/user/:id/avatar", async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, avatar = $3 WHERE id = $2 RETURNING *",
      [name, email, imageUrl, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update avatar" });
  }
});

// ✅ PUT /api/user/:id - Update name and email
router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user info" });
  }
});

export default router;
