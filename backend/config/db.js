import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;


const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  user: isProduction ? process.env.ONREDER_DB_USER : process.env.LOCAL_DB_USER,
  host: isProduction ? process.env.ONREDER_DB_HOST : process.env.LOCAL_DB_HOST,
  database: isProduction ? process.env.ONREDER_DB_NAME : process.env.LOCAL_DB_NAME,
  password: isProduction ? process.env.ONREDER_DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
  port: Number(isProduction ? process.env.ONREDER_DB_PORT : process.env.LOCAL_DB_PORT),
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});



const res = await pool.query('SELECT current_database();');
console.log("Currently connected to:", res.rows[0].current_database);


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err);
  } else {
    console.log("✅ PostgreSQL connected at:", res.rows[0].now);
  }
});




export default pool;
