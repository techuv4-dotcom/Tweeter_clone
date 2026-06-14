import TrendingCard from "../components/feed/TrendingCard";
import FollowSuggestion from "../components/feed/FollowSuggestion";
import FeedSection from "../components/feed/FeedSection";
import LeftSidebar from "../components/feed/LeftSidebar";
import axiosInstance from "../utils/Axios.instance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const FeedPage = () => {
  const [user_n, setUser] = useState<any>(null);

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

      <div className="max-w-7xl mx-auto flex">
        <LeftSidebar user={user_n} />

        <FeedSection user={user_n} />

        <div className="hidden xl:block w-[350px] p-4">
          <TrendingCard />
          <FollowSuggestion />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
