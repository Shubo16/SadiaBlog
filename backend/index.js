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
      secure: process.env.SECURE_COOKIES === 'true', // Use a specific env var
      sameSite: process.env.SECURE_COOKIES === 'true' ? "none" : "lax", // sameSite="none" requires secure:true
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Then Passport
app.use(passport.initialize());
app.use(passport.session());

// Then CORS, JSON parsing, static files, etc.
const allowedOrigins = [
  process.env.BASE_URL_FRONTEND,
  process.env.BASE_URL,
].filter(Boolean); // Remove any undefined

app.use(
  cors({
    origin: allowedOrigins,
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
    const result = await pool.query("SELECT * FROM users");
    res.json({ ok: true, user: result.rows[1] || "No user data" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
