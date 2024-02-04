import expres from "express";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// env config
dotenv.config(); //is .env is in another folder then use config("./folder name")

// router import
import router from "./routes/userRoute.js";

// mongodb Connection
connectDB();

// rest Objects
const app = expres();

// middlewares
app.use(cors());
app.use(expres.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", router);

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
   console.log(
      `server is running in ${process.env.NODE_MODE} on port ${PORT} `.bgMagenta
         .white
   );
});
