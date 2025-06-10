import pkg from "pg";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Optional debug
(async () => {
  try {
    const res = await pool.query("SELECT current_database();");
    console.log("✅ Currently connected to:", res.rows[0].current_database);
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err.message);
  }
})();

export default pool;