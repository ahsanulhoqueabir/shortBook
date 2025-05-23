import Lottie from "lottie-react";
import err from "../assets/animation/pnf.json";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Lottie className="w-[60%] h-96 flex-1" animationData={err}></Lottie>
    </div>
  );
};

export default ErrorPage;
