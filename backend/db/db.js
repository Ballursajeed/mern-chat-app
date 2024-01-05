import mongoose from "mongoose";

 export const connectDB = async() => {
  try {

const MongoDB = await mongoose.connect(process.env.MONGO_URL)
 console.log("mongoDB connected!! on host:",MongoDB.connection.host);

  } catch (error) {
    console.log("MongoDB connection failed:",error);
    throw new Error("MonogoDB failed to connect:",error)
  }
} 