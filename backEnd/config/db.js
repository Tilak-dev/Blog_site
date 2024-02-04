import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`mongoDB has connected ${mongoose.connection.host}`.bgGreen);
   } catch (error) {
      console.log(`MONGODB connected ${error}`.bgRed);
   }
};

export default connectDB
