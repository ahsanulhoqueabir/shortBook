import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import courses from "../../assets/data/courses.json";
import { Label } from "../ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const Navbar = () => {
  const [course, setCourse] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !description) {
      alert("Please fill in all fields");
      return;
    }
    const data = {
      courseID: course,
      description: description,
      semester: "S22",
      createdAt: new Date(),
    };
    setLoading(true);
    await addDoc(collection(db, "posts"), data)
      .then(() => {
        setLoading(false);
        setOpen(false);
        toast.success("Post created successfully");
      })
      .catch(() => {
        setLoading(false);
        setOpen(false);
        toast.error("Error creating post");
      });
    setOpen(false);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between px-5 lg:px-16">
      <Link to={"/"} className=" text-xl flex gap-1.5 items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-2" />
        <span className="hidden md:inline">ShortBook</span>
      </Link>
      <div className="">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Short Notes</DialogTitle>
              <DialogDescription>
                Create a new short note and share it with the world. You can
                also save it as a draft to publish later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger id="course" className="w-full col-span-3">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(
                    (course: {
                      id: string;
                      CourseCode: string;
                      CourseTitle: string;
                    }) => (
                      <SelectItem
                        key={course.CourseCode}
                        value={course.CourseTitle}
                      >
                        {course.CourseTitle}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                id="notes"
                placeholder="Enter your notes here…"
                className="col-span-3 h-24 resize-none"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} type="submit">
                <span className={`${loading ? "hidden" : ""}`}>
                  Save changes
                </span>
                {loading && (
                  <span className="loading loading-dots loading-lg"></span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
