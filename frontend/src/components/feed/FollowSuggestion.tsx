import React from "react";

const FollowSuggestion: React.FC = () => {
  return (
    <div
      className="
      bg-gray-100
      dark:bg-zinc-900
      rounded-3xl
      p-5
      transition-all
      duration-300
    "
    >
      <h2 className="text-xl font-bold mb-5">Who to follow</h2>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
          flex
          items-center
          justify-between
          mb-5
          hover:bg-gray-200
          dark:hover:bg-zinc-800
          p-2
          rounded-2xl
          transition
          cursor-pointer
        "
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/100?img=${item + 20}`}
              alt="follow"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Developer {item}</h3>

              <p className="text-gray-500 dark:text-zinc-500 text-sm">
                @developer{item}
              </p>
            </div>
          </div>

          <button
            className="
            bg-black
            text-white
            dark:bg-white
            dark:text-black
            px-4
            py-2
            rounded-full
            font-semibold
            text-sm
            hover:opacity-90
            transition
          "
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowSuggestion;
