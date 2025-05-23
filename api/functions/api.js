import cors from "cors";
import jwt from "jsonwebtoken";
import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwtRoute from "../route/middleware.js";
import courseRoute from "../route/courseR.js";
import postRoute from "../route/postR.js";

const port = process.env.port || 5000;
dotenv.config();

const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to My Server");
});

const dburi = process.env.MONGODB_URI;
mongoose
  .connect(dburi)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
app.use(express.json());
app.use(cors(corsOptions));

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
});
app.use("/.netlify/functions/api/v1", router);
// app.use("/.netlify/functions/api/v1/verify", jwtRoute);
app.use("/.netlify/functions/api/v1/course", courseRoute);
app.use("/.netlify/functions/api/v1/post", postRoute);

export const handler = serverless(app);
