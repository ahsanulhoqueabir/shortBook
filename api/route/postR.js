import express from "express";
import { createPost, getPosts } from "../controller/postC.js";

const router = express.Router();

router.post("/new", createPost);
router.get("/get", getPosts);

export default router;
