import express from "express";
import {
   getAllUsers,
   loginController,
   resisterController,
} from "../controllers/userControl.js";

// route Objects
const router = express.Router();

// Create User || POST
router.post("/resister", resisterController);

// Get all users || GET
router.get("/users", getAllUsers);

// Login  || POST
router.post("/login", loginController);

export default router;
