import express from "express";
import {
  createCourse,
  createManyCourses,
  getAllCourses,
  getCourseById,
} from "../controller/courseC.js";

const router = express.Router();

router.post("/", createCourse);
router.post("/many", createManyCourses);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

export default router;
