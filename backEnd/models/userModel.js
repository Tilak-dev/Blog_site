import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "username is necessary"],
      },
      email: {
         type: String,
         required: [true, "email is necessary"],
      },
      password: {
         type: String,
         required: [true, "password is necessary"],
      },
   },
   { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
