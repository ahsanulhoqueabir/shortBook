import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    type: { type: String },
    description: { type: String },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    semester: { type: String },
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);

export default post;
