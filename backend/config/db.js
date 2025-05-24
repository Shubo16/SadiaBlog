import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: isProduction
    ? { rejectUnauthorized: false } // Required for Render
    : false,                        // Disable SSL locally
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err);
  } else {
    console.log("✅ PostgreSQL connected at:", res.rows[0].now);
  }
});

export default pool;
