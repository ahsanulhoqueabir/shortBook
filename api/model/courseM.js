import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    CourseTitle: { type: String, required: true },
    CourseCode: { type: String, required: true },
    semester: { type: String, required: true },
    CourseType: { type: String, required: true },
    Marks: { type: Number, required: true },
    Credit: { type: Number, required: true },
    code: { type: String },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
