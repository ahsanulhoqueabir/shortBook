import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { db } from "../firebase/firebase.config";

const GroupedNotes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  type Post = {
    id: string;
    description: string;
    courseID: string;
    createdAt: string;
    semester: string;
  };
  const [data, setData] = useState<Record<string, Post[]>>({});
  const [activeTab, setActiveTab] = useState<string>("all");
  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsRef = collection(db, "posts");
      const allPostsQuery = query(postsRef, orderBy("createdAt", "desc"));
      const allPostsSnapshot = await getDocs(allPostsQuery);
      const allPosts = allPostsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          description: data.description ?? "",
          courseID: data.courseID ?? "",
          createdAt: data.createdAt ?? "",
          semester: data.semester ?? "",
        };
      });
      const key = "courseID";
      const groupedPosts = allPosts.reduce(
        (acc: Record<string, typeof allPosts>, post) => {
          const keyValue = post[key];
          if (!acc[keyValue]) {
            acc[keyValue] = [];
          }
          acc[keyValue].push(post);
          return acc;
        },
        {}
      );
      setData(groupedPosts);
      setLoading(false);
    };
    fetchAllPosts();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <div className="py-10 px-5 lg:px-10 grid lg:grid-cols-3 mx-auto gap-4 lg:w-4/5">
        {activeTab === "all" &&
          Object.entries(data).map(([courseID]) => (
            <div
              onClick={() => setActiveTab(courseID)}
              key={courseID}
              className="px-4 py-2 border rounded-lg shadow-md relative"
            >
              <img
                src={coverImage[courseID] || ""}
                alt={courseID}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-semibold mb-2">{courseID}</h2>
              <span className=" absolute top-5 text-gray-500 text-3xl p-1 px-4 bg-teal-200 rounded-full">
                {" "}
                {data[courseID].length}
              </span>
            </div>
          ))}
        {activeTab !== "all" &&
          data[activeTab]?.map((post) => (
            <div
              key={post.id}
              className="relative post-card h-full w-full rounded-lg shadow-lg border-[1px] shadow-gray-200 overflow-hidden p-2"
            >
              <div className="lg:flex gap-3 items-center justify-between">
                <div className="grid justify-between items-stretch w-full gap-7">
                  <div className="h-full flex flex-col justify-between">
                    <h1 className="text-md">{post.description}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GroupedNotes;

const coverImage: Record<string, string> = {
  "Introduction to Statistic and Probability":
    "https://res.cloudinary.com/dz0wrvosv/image/upload/v1748697594/stat_rlm31d.png",
  "Computer Architecture":
    "https://res.cloudinary.com/dz0wrvosv/image/upload/v1748697594/ca_bg5pbm.png",
};
