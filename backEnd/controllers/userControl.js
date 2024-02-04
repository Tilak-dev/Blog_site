import userModel from "../models/userModel.js";
import bcript from "bcrypt";

// resister users
export const resisterController = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      // validation
      if (!username || !email || !password) {
         return res.status(400).send({
            success: false,
            message: "Please filled required fields ",
         });
      }
      // exisisting user
      const exisisting = await userModel.findOne({ email });
      if (exisisting) {
         return res.status(500).send({
            message: "user already exists",
            success: false,
         });
      }

      // hashed password
      const hashedPassword = await bcript.hash(password, 10);

      // save user
      const user = new userModel({ username, email, password: hashedPassword });
      const saved = await user.save();
      return res.status(200).send({
         success: true,
         message: "new user Created ",
         saved,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         message: "error in Resistration",
         success: false,
         error,
      });
      ``;
   }
};

// get All users
export const getAllUsers = async (req, res) => {
   try {
      const users = await userModel.find({});
      return res.status(200).send({
         userCount: users.length,
         success: true,
         message: "all user data ",
         users,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in Get all users",
         error,
      });
   }
};

// login users
export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body;
      // validation
      if (!email || !password) {
         return res.status(401).send({
            success: false,
            message: "Please provide Email or password",
         });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(500).send({
            success: false,
            message: "email does not register ",
         });
      }
      // password checking
      const isMatch = await bcript.compare(password, user.password);
      if (!isMatch) {
         return res.status(500).send({
            success: false,
            message: "invalid username or password ",
         });
      }
      return res.status(200).send({
         success:true,
         message:"Login successfully",
         user
      })
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "Error in login ",
         error,
      });
   }
};
