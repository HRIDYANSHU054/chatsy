import bcrypt from "bcryptjs";

export async function generateHashedPassword(pass) {
  return await bcrypt.hash(pass, 12);
}

generateHashedPassword("pass@123")
  .then((hash) => console.log(hash))
  .catch((err) => console.log("error:", err.message));
