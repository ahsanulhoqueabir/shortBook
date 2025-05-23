import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/axios/UseAxiosPublic";
import LoadingPage from "./LoadingPage";
import Post from "../components/home/Post";
import Loader from "../components/common/Loader";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reloading, setReloading] = useState<boolean>(true);
  const [posts, setPosts] = useState<
    Array<{
      description: string;
      courseTitle: string;
    }>
  >([]);
  const [page, setPage] = useState<number>(1);
  // const [toatlNews, setTotalNews] = useState<boolean>(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    setReloading(true);
    axiosPublic.get(`/post/get?page=${page}`).then((res) => {
      setPosts((prev) => [...prev, ...res.data]);
      setLoading(false);
      setReloading(false);
    });
  }, [axiosPublic, page]);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <div className="py-10 px-5 lg:px-10 grid lg:grid-cols-3 mx-auto gap-4 lg:w-4/5">
        {posts?.map((post, ind) => (
          <Post page={page} setPage={setPage} key={ind} post={post} />
        ))}
      </div>
      {reloading ? <Loader /> : null}
    </div>
  );
};

export default Home;
