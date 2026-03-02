import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(
      `mongodb+srv://mrunalpmalkar:${process.env.MONGOOSE_PASSWORD}@musical-cluster.hhc9iov.mongodb.net/`
    );
  } catch (err) {
    const error:string=(`error occured while trying to connect to DB: ${err}`);
    setTimeout(()=>{
      connectDB();
    },5000)
  }
};

export default connectDB;
