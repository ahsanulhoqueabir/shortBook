import Courses from "../model/courseM.js";

const createCourse = async (req, res) => {
  const { courseTitle, courseCode, semester, courseType, Marks, Credit } =
    req.body;
  try {
    const newCourse = await Courses.create({
      courseTitle,
      courseCode,
      semester,
      courseType,
      Marks,
      Credit,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createManyCourses = async (req, res) => {
  const courses = req.body;
  try {
    const newCourses = await Courses.insertMany(courses);
    res.status(201).json(newCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Courses.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createCourse, createManyCourses, getAllCourses, getCourseById };
