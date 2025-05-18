import bcrypt from "bcryptjs";

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare passwords
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/* hashing passwords allows the password to be hashed saved before it enters the database
this is then used for the login, when logging in it compares the hashed passwrod with the stored password 

*/
