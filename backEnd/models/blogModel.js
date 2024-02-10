import mongoose from "mongoose";

const blogShema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "title is required"],
      },
      description: {
         type: String,
         required: [true, "description is required"],
      },
      image: {
         type: String,
         required: [true, "image is required"],
      },
      user: {
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: [true, "user id is  require"],
      },
   },
   {
      timeseries: true,
   }
);

const blogModel = mongoose.model("Blogs", blogShema);

export default blogModel;
