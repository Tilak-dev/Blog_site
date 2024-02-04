import expres from "express";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";

// env config
dotenv.config(); //is .env is in another folder then use config("./folder name")

// rest Objects
const app = expres();

// middlewares
app.use(cors());
app.use(expres.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
   res.status(200).send({
      message: "hn bhai chal gya",
   });
});

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
   console.log(`server is running in ${process.env.NODE_MODE} on port ${PORT} `.bgBlue.white);
});
