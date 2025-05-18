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
// import db from "./config/db.js";

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
app.use(
  session({
    secret: "E1925",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
  })
);

// Then Passport
app.use(passport.initialize());
app.use(passport.session());

// Then CORS, JSON parsing, static files, etc.
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/api", avatarRoutes)
app.use("/api", recover);
app.use("/api", likesRouter);
app.use("/api", comments);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend for Sadia's Blog!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
