import mongoose from "mongoose";
import connectDB from "../db/mongoose";

async function initializeDB() {
  await connectDB();
}

await initializeDB();

const streamSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  channelName:{
    type:String
  },
  duration:{
    type:String,
  },
  creator:{
    type:String,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl:{
    type:String,
    required:false,
  },
  upvotes:{
    type:Array,
    default:[],
  },
  zone:{
    type:String,
  }
});

const Stream = mongoose.models.Stream || mongoose.model("Stream", streamSchema);

export default Stream;
