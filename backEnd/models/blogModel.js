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
   },
   {
      timeseries: true,
   }
);

const blogModel = mongoose.model("blogs", blogShema);

export default blogModel;
