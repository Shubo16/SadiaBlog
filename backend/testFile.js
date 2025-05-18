import bcrypt from "bcryptjs";

const testHash = async () => {
  const password = "test123";
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);
};

testHash();
