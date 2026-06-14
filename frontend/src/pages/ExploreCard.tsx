import React from "react";
import { Search, TrendingUp } from "lucide-react";
import LeftSidebar from "../components/feed/LeftSidebar";

const user = {
  name: "mohd uvaish",
  email: "techuv4@gmail.com",
};

const exploreCards = [
  {
    title: "Modern React Patterns",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "AI is changing frontend development",
    category: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Top UI Trends in 2026",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
  },
];

const ExplorePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="flex max-w-[1400px] mx-auto">
        {/* LEFT SIDEBAR */}
        <LeftSidebar user={user} />

        {/* CENTER SECTION */}
        <div className="flex-1 flex justify-center">
          <main
            className="
              w-full
              max-w-[620px]
              border-x
              border-gray-200
              dark:border-zinc-800
              min-h-screen
            "
          >
            {/* HEADER */}
            <div
              className="
                sticky
                top-0
                z-50
                backdrop-blur-md
                bg-white/80
                dark:bg-black/80
                border-b
                border-gray-200
                dark:border-zinc-800
                px-5
                py-4
              "
            >
              <h1 className="text-xl font-bold">Explore</h1>
            </div>

            {/* SEARCH */}
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
              <div
                className="
                  flex
                  items-center
                  gap-3
                  bg-gray-100
                  dark:bg-zinc-900
                  rounded-full
                  px-4
                  py-3
                "
              >
                <Search size={20} className="text-gray-500" />

                <input
                  type="text"
                  placeholder="Search trends, posts, people..."
                  className="
                    bg-transparent
                    outline-none
                    w-full
                    text-sm
                    placeholder:text-gray-500
                  "
                />
              </div>
            </div>

            {/* HERO SECTION */}
            <div className="relative border-b border-gray-200 dark:border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="hero"
                className="w-full h-[320px] object-cover"
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/40
                  to-transparent
                  flex
                  items-end
                "
              >
                <div className="p-5">
                  <p className="text-sm text-gray-300 mb-2">
                    Trending Worldwide
                  </p>

                  <h2 className="text-4xl font-bold leading-tight max-w-[500px] text-white">
                    The future of frontend development with AI tools
                  </h2>

                  <div className="flex items-center gap-2 mt-3 text-gray-300">
                    <TrendingUp size={18} />

                    <p className="text-sm">124K people discussing this</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRENDING POSTS */}
            <div className="p-4 space-y-4">
              {exploreCards.map((card, index) => (
                <div
                  key={index}
                  className="
                    border
                    border-gray-200
                    dark:border-zinc-800
                    rounded-2xl
                    overflow-hidden
                    hover:bg-gray-50
                    dark:hover:bg-zinc-900/40
                    transition
                    cursor-pointer
                  "
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {card.category}
                    </p>

                    <h3 className="font-semibold text-lg leading-snug">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
