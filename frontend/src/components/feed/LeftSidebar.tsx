import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  User,
  Search,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

interface Props {
  user: any;
  mobile?: boolean;
}

const LeftSidebar: React.FC<Props> = ({ user, mobile = false }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Explore", path: "/explore" },
    // { icon: Bell, label: "Notifications", path: "/notifications" },
    // { icon: MessageCircle, label: "Messages", path: "/messages" },
    // { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
    { icon: User, label: "Profile", path: `/profile/${user?.id}` },
  ];
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`
    ${mobile ? "flex" : "hidden lg:flex"}
    flex-col
    justify-between
    w-[250px]
    border-r
    border-gray-200
    dark:border-zinc-800
    px-4
    py-4
    ${mobile ? "h-full" : "sticky top-0 h-dvh"}
    bg-white
    dark:bg-black
  `}
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-8 tracking-tight">Connect</h1>

        {/* NAVIGATION */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={item.label}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-full
                  transition
                  w-fit
                  ${
                    isActive
                      ? "bg-gray-200 dark:bg-zinc-900 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-900"
                  }
                `}
              >
                <Icon size={22} />
                <span className="text-[17px]">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* BUTTON */}
        <button
          className="
            w-full
            mt-6
            bg-black
            text-white
            dark:bg-white
            dark:text-black
            py-3
            rounded-full
            font-semibold
            text-sm
            hover:opacity-90
            transition
          "
        >
          Create Post
        </button>
      </div>

      {/* BOTTOM */}
      <div className="mt-auto space-y-3 pt-4">
        {/* PROFILE */}
        <div
          className="
            flex
            items-center
            justify-between
            hover:bg-gray-100
            dark:hover:bg-zinc-900
            p-3
            rounded-full
            cursor-pointer
            transition
          "
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/100?img=${user?.id}`}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="leading-tight">
              <h3 className="font-semibold text-sm">{user?.name}</h3>

              <p className="text-gray-500 dark:text-zinc-500 text-xs">
                {user?.email}
              </p>
            </div>
          </div>

          <MoreHorizontal size={18} />
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={onLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            border
            border-red-500
            text-red-500
            py-2.5
            rounded-full
            hover:bg-red-500
            hover:text-white
            transition
            font-medium
          "
        >
          <LogOut size={10} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
