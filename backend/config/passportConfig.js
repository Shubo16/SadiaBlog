import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from '../config/db.js';  // Import your PostgreSQL database connection
import bcrypt from 'bcryptjs';  // Make sure bcrypt is imported

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

// Local strategy for email/password login
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
          return done(null, false, { message: 'No user found with this email.' });
        }

        const user = rows[0];
        console.log('👤 User from DB:', user);
        console.log("Received password:", password); // log the plain password
        console.log('🔑 Stored hashed password:', user.hashed_password);
          // This should be correctly stored

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);  // Authentication successful
      } catch (error) {
        return done(error);
      }
    }
  )
);
