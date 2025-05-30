import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
// import morgan from 'morgan';
import session from "express-session";
import passport from "passport";
import fs from "fs";
import blog from "./routes/blog.js"; // Blog routes
import authRoutes from "./routes/auth.js"; // Authentication routes
import "./config/passportConfig.js"; // Import Passport config
import userRoutes from "./routes/users.js";
import avatarRoutes from "./routes/avatar.js";
import recover from "./routes/recoverBlog.js";
import comments from "./routes/comments.js";
import likesRouter from "./routes/likes.js";
import pool from "./config/db.js";

// Load environment variables at the very top
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
// Session must come first
app.set("trust proxy", 1); // 🟢 Required for secure cookies on Render or behind any proxy

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Then Passport
app.use(passport.initialize());
app.use(passport.session());

// Then CORS, JSON parsing, static files, etc.
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sadiablog.onrender.com"],
    credentials: true,
  })
);

app.use(express.json()); // Ensure JSON parsing works
app.use(express.urlencoded({ extended: true })); // Handles form data properly
app.use(express.static("public"));
app.use("/uploads", express.static(uploadsDir)); // Serve uploads

// Handle routes
app.use("/api", userRoutes);
app.use("/api", blog);
app.use("/api", authRoutes);
app.use("/api", avatarRoutes);
app.use("/api", recover);
app.use("/api", likesRouter);
app.use("/api", comments);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend for Sadia's Blog using render!");
});

app.get("/debug-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blog LIMIT 1");
    res.json({ ok: true, blog: result.rows[0] || "No blog data" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
