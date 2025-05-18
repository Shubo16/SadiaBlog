import express from "express";
import passport from "passport";

const router = express.Router();

// 👇 New route to get the currently logged-in user
router.get("/user", (req, res) => {
  console.log(req.session); // Add this to see the session object
  if (req.isAuthenticated()) {
    res.json(req.user); // This should return user data if logged in
  } else {
    res.status(401).json({ user: null, message: "not autheticated" });
  }
});

// PUT /api/user/:id/avatar
router.put("/user/:id/avatar", async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, imageUrl, id]
    );

    res.json(result.rows[0]); // Send back the updated user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update avatar" });
  }
});

//editing user name and info

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    ("UPDATE users SET name = $1,email = $2");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update name" });
  }
});

export default router;
