import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwtRoute from "./route/middleware.js";
import courseRoute from "./route/courseR.js";
import postRoute from "./route/postR.js";

dotenv.config();

const port = process.env.port || 5000;
const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my server");
});

const dburi = process.env.MONGODB_URI;

const connection = async () => {
  try {
    await mongoose.connect(dburi);
    console.log("connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1", router);
app.use("/api/v1/verify", jwtRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/post", postRoute);

app.listen(port, () => {
  connection();
  console.log(`Server is running at ${port}`);
});
export const handler = serverless(app);
