import type React from "react";
import { Search } from "lucide-react";

const TrendingCard: React.FC = () => {
  return (
    <div className="hidden xl:block w-[350px] px-6 py-5">
      {/* Search */}
      <div
        className="
        bg-gray-100
        dark:bg-zinc-900
        rounded-full
        px-5
        py-3
        flex
        items-center
        gap-3
        mb-6
        sticky
        top-4
        transition-all
        duration-300
      "
      >
        <Search size={18} className="text-gray-500 dark:text-zinc-500" />

        <input
          type="text"
          placeholder="Search"
          className="
          bg-transparent
          outline-none
          w-full
          text-black
          dark:text-white
          placeholder:text-gray-500
          dark:placeholder:text-zinc-500
        "
        />
      </div>

      {/* Trending */}
      <div
        className="
        bg-gray-100
        dark:bg-zinc-900
        rounded-3xl
        p-5
        mb-6
        transition-all
        duration-300
      "
      >
        <h2 className="text-xl font-bold mb-5">Trends for you</h2>

        <div className="space-y-5">
          {["ReactJS", "TypeScript", "TailwindCSS", "NestJS", "Frontend"].map(
            (trend) => (
              <div
                key={trend}
                className="
              hover:bg-gray-200
              dark:hover:bg-zinc-800
              transition
              p-2
              rounded-xl
              cursor-pointer
            "
              >
                <p className="text-gray-500 dark:text-zinc-500 text-sm">
                  Trending in Tech
                </p>

                <h3 className="font-semibold mt-1">#{trend}</h3>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
