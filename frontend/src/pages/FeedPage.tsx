import TrendingCard from "../components/feed/TrendingCard";
import FollowSuggestion from "../components/feed/FollowSuggestion";
import FeedSection from "../components/feed/FeedSection";
import LeftSidebar from "../components/feed/LeftSidebar";
import axiosInstance from "../utils/Axios.instance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Menu, X } from "lucide-react";

const FeedPage = () => {
  const [user_n, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  // Theme Change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch User
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await axiosInstance.get("/users/Home");
        toast.success(user.data.message);
        // console.log(user.data);
        setUser(user.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div
      className="
      min-h-screen
      bg-white
      text-black
      dark:bg-black
      dark:text-white
      transition-all
      duration-300
     "
    >
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <h1 className="font-bold text-lg">Connect</h1>

          <div className="w-6" />
        </div>
      </div>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="
        fixed
        top-5
        right-5
        z-50
        p-3
        rounded-full
        shadow-lg
        bg-black
        text-white
        dark:bg-white
        dark:text-black
        transition-all
        duration-300
      "
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="max-w-7xl mx-auto flex w-full">
        <LeftSidebar user={user_n} />
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Drawer */}
            <div
              className="
        fixed
        top-0
        left-0
        h-full
        w-[280px]
        bg-white
        dark:bg-black
        z-50
        lg:hidden
        shadow-xl
      "
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <LeftSidebar user={user_n} mobile />
            </div>
          </>
        )}

        <div className="flex-1 min-w-0">
          <FeedSection user={user_n} />
        </div>

        <div className="hidden xl:block w-[350px] p-4">
          <TrendingCard />
          <FollowSuggestion />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
