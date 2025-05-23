import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import Post from "../components/home/Post";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<
    Array<{
      id: string;
      description: string;
      courseID: string;
      createdAt: string;
      semester: string;
    }>
  >([]);
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
      setPosts(allPosts);
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
        {posts?.map((post, ind) => (
          <Post key={ind} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
