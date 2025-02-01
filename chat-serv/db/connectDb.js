import mongoose from "mongoose";

export async function connectDb() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected", connection.host);
  } catch (error) {
    console.log("Error while connecting to the db", error.message);
    process.exit(1); //1 is failure, 0 is success!
  }
}
