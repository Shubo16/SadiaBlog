import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword, comparePassword } from "../utilities/authUtilities.js";
import pool from "../config/db.js"; // Removed duplicate db import

dotenv.config();
const router = express.Router();

// Passport Local Strategy for Authentication
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      // Compare hashed passwords
      const isMatch = await comparePassword(password, user.hashed_password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Passport Session Management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
});

// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

/**
 * User Registration (Sign Up)
 * Route: POST /auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(password);
    console.log("Generated Hashed Password:", hashedPassword);

    // Insert user into database
    const query = `
      INSERT INTO users (first_name, last_name, username, email, hashed_password) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    await pool.query(query, [firstName, lastName, userName, email, hashedPassword]);
    
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("ERROR creating user:", error);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
});

/**
 * User Login (Authenticate)
 * Route: POST /auth/login/password
 */

router.get("/login", async (req,res) => {
  res.json("Login page")
})
router.post("/login/password", (req, res, next) => {
  console.log("🔵 Backend received login request with body", req.body);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("⚠️ Authentication error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (!user) {
      console.log("❌ Invalid credentials:", info.message);
      return res.status(401).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("⚠️ Login error:", err);
        return res.status(500).json({ error: "Login failed" });
      }
      console.log("✅ Login successful:", user.email);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

/**
 * User Logout
 * Route: POST /auth/logout
 */
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
});

/**
 * Check if User is Authenticated
 * Route: GET /auth/status
 */
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

console.log("⚠️ /debug-session route loaded");

router.get("/debug-session", (req, res) => {
  res.json({
    session: req.session,
    passport: req.session?.passport,
    user: req.user
  });
});


export default router;
