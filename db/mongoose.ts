import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("mongoose already connected!");
      return;
    }
    await mongoose.connect(
      "mongodb+srv://mrunalpmalkar:3Glv3ImipmA1IHx1@musical-cluster.hhc9iov.mongodb.net/"
    );
    console.log("connected to DB");
  } catch (err) {
    console.log("error occured while trying to connect to DB:", err);
  }
};

export default connectDB;
