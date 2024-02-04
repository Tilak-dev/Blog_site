import userModel from "../models/userModel.js";

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

      // save user
      const user = new userModel({ username, email, password });
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
   }
};

// get All users
export const getAllUsers = () => {};

// login users
export const loginController = () => {};
