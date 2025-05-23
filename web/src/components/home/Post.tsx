interface PostProps {
  post: {
    description: string;
    courseID: string;
    createdAt: string;
    semester: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  console.log(post);
  return (
    <div className="relative post-card h-full w-full  rounded-lg shadow-lg border-[1px] shadow-gray-200 overflow-hidden p-2 ">
      <div className="lg:flex gap-3 items-center justify-between">
        <div className="grid justify-between items-stretch  w-full gap-7">
          <div className="h-full flex flex-col justify-between">
            <h1 className="text-md ">{post.description}</h1>
            <p className="text-xs text-gray-500 pb-2">
              <span className="text-xs">{post.courseID} </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
