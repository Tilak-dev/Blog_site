import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

// Get all Blogs
export const getAllBlogController = async (req, res) => {
   try {
      const blogs = await blogModel.find({});
      if (!blogs) {
         return res.status(200).send({
            success: false,
            message: "No blog found ",
         });
      }
      return res.status(200).send({
         success: true,
         blogCount: blogs.length,
         message: "all blog List",
         blogs,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in get all blogs ",
         error,
      });
   }
};

// Create blog
export const createBlogController = async (req, res) => {
   try {
      const { title, description, image, user } = req.body;
      //validation
      if (!title || !description || !image || !user) {
         return res.status(400).send({
            success: false,
            message: "Please Provide ALl Fields",
         });
      }
      const exisitingUser = await userModel.findById(user);
      //validaton
      if (!exisitingUser) {
         return res.status(404).send({
            success: false,
            message: "unable to find user",
         });
      }

      const newBlog = new blogModel({ title, description, image, user });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({ session });
      exisitingUser.blogs.push(newBlog);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
         success: true,
         message: "Blog Created!",
         newBlog,
      });
   } catch (error) {
      console.log(error);
      return res.status(400).send({
         success: false,
         message: "Error WHile Creating blog",
         error,
      });
   }
};

// Update blogs
export const updateBlogController = async (req, res) => {
   try {
      const id = req.params;
      const { title, description, image } = req.body;
      const blog = await blogModel.findByIdAndUpdate(
         id,
         { ...req.body },
         { new: true }
      );
      return res.status(200).send({
         success: true,
         message: "Blog updated successfully ",
         blog,
      });
   } catch (error) {
      console.log(error);
      return res.status(200).send({
         success: false,
         message: "error in updating blog",
         error,
      });
   }
};

// get a single blog
export const getBlogController = async (req, res) => {
   try {
      const id = req.params;
      const blog = await blogModel.findById(id).populate("user");
      if (!blog) {
         return res.status(404).send({
            success: false,
            message: "Blog is not Found",
         });
      }

      return res.status(200).send({
         success: true,
         message: "fetched single blog ",
         blog,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in get single blog",
         error,
      });
   }
};

// deletre blog
export const deleteBlog = async (req, res) => {
   try {
      const id = req.params;
      const blog = await blogModel.findByIdAndDelete(id).populate("user");
      if (!blog) {
         return res.status(404).send({
            success: false,
            message: "blog is not FOUND ",
         });
      }
      // If blog exists, continue with deletion process
      await blog.user.blogs.pull(blog);
      await blog.user.save();

      return res.status(200).send({
         success: true,
         message: "Blog successfully deleted from our system",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in deleting blog",
         error,
      });
   }
};
