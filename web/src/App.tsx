import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { Toaster } from "./components/ui/sonner";
function App() {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
