import blogModel from "../models/blogModel.js";

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
      const { title, description, image } = req.body;
      // validations
      if (!title || !description || !image) {
         return res.status(400).send({
            success: false,
            message: "Please field require things ",
         });
      }
      const newBlog = new blogModel({ title, description, image });
      const savedBlog = await newBlog.save();
      return res.status(200).send({
         success: true,
         message: "blog created successfiully",
         savedBlog,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in creating blogs ",
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
      const  id  = req.params;
      const blog = await blogModel.findById(id);
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
export const deleteBlog = async (req,res) => {
   try {
      const id = req.params
      const blog = await blogModel.findByIdAndDelete(id)
      if(!blog){
         return res.status(404).send({
            success:false,
            message:"blog is not FOUND ",
         })
      }
      return res.status(200).send({
         success:true,
         message:"Blog successfully deleted from our system",
      })
      
   } catch (error) {
      console.log(error)
      return res.status(500).send({
         success:false,
         message:"error in deleting blog",
         error
      })
      
   }
};