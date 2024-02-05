import express from "express";
import {
   createBlogController,
   deleteBlog,
   getAllBlogController,
   getBlogController,
   updateBlogController,
} from "../controllers/blogControl.js";

// router
const blogRouter = express.Router();

// routes
// GET || all blogs
blogRouter.get("/all-blog", getAllBlogController);

//POST || create POST
blogRouter.post("/create-blog", createBlogController);

// PUT || update Blogs
blogRouter.put("/update-blog/:_id", updateBlogController);

// GET || Get a single blog
blogRouter.get("/get-blog/:_id", getBlogController);

//DELETE || delete
blogRouter.delete("/delete-blog/:_id", deleteBlog);

export default blogRouter;
