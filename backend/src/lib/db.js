import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`,ongo connect ${connect.connection.host}`);
  } catch (error) {
    console.log("error---->", error);
    process.exit(1);
  }
};
