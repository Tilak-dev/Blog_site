import express from "express";
import { getAllUsers, loginController, resisterController } from "../controllers/userControl";

// route Objects
const router = express.Router();

// Get all users || GET
router.get("/users", getAllUsers);

// Create User || POST
router.post("/resister", resisterController)

// Login  || POST
router.post("/login",loginController)


export default router;
