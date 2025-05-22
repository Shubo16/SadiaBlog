import pkg from 'pg';
const { Pool } = pkg;

const pool =  new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err);
  } else {
    console.log("✅ PostgreSQL connected at:", res.rows[0]);
  }
});

export default pool;
