import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("mongoose already connected!");
      return;
    }
    await mongoose.connect(
      `mongodb+srv://mrunalpmalkar:${process.env.MONGOOSE_PASSWORD}@musical-cluster.hhc9iov.mongodb.net/`
    );
    console.log("connected to DB");
  } catch (err) {
    const error:string=(`error occured while trying to connect to DB: ${err}`);
    console.log(error);
    setTimeout(()=>{
      connectDB();
    },5000)
  }
};

export default connectDB;
