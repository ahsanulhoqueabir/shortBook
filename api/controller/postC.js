import Posts from "../model/postM.js";
import Courses from "../model/courseM.js";

const createPost = async (req, res) => {
  const { type, description, courseID, semester } = req.body;
  try {
    const newPost = await Posts.create({
      type: type || "post",
      description,
      courseID,
      semester: semester || "S22",
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  const { cid, limit, semester } = req.query;
  try {
    const projection = {};
    const match = {};
    if (cid) {
      match.courseID = cid;
    }
    if (semester) {
      match.semester = semester;
    }
    const posts = await Posts.aggregate([
      {
        $match: match,
      },
      {
        $sample: { size: parseInt(limit) || 10 },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseID",
          foreignField: "_id",
          as: "courseID",
        },
      },
      {
        $unwind: {
          path: "$courseID",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          courseTitle: "$courseID.CourseTitle",
          description: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getPosts };
