import mongoose from "mongoose";
import connectDB from "../db/mongoose";

async function initializeDB() {
  await connectDB();
}

await initializeDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
