import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwtRoute from "./route/middleware.js";
import courseRoute from "./route/courseR.js";
import postRoute from "./route/postR.js";

dotenv.config();

const app = express();

// ✅ Corrected CORS option
const corsOptions = { origin: true, credentials: true };
app.use(cors(corsOptions));
app.use(express.json());

// ✅ MongoDB connection caching for serverless
let isConnected = false;
const dburi = process.env.MONGODB_URI;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// ✅ Call DB connection before requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ✅ Set up routes
app.get("/api/v1", (req, res) => {
  res.send("Welcome to my server");
});

app.use("/api/v1/verify", jwtRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/post", postRoute);

// ✅ Remove app.listen — use serverless
export default serverless(app); // ✅ for Vercel `/api/index.js`
