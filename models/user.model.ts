import mongoose from "mongoose";
import connectDB from "../db/mongoose";

(async () => {
  await connectDB();
})();

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;