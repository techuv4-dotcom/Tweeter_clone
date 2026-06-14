import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/feed/LeftSidebar";
import axiosInstance from "../utils/Axios.instance";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/tweets/${id}`);

        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Left Sidebar */}
      <LeftSidebar user={data} />

      {/* Centered Content */}
      <div className="flex-1 flex justify-center px-4">
        <main className="w-full max-w-3xl border-x border-gray-200 dark:border-zinc-800">
          {/* Cover Image */}
          <div className="relative">
            <div className="h-56 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            {/* Profile Section */}
            <div className="px-6">
              <img
                src={`https://i.pravatar.cc/150?img=${data?.id}`}
                alt="profile"
                className="
                  w-32
                  h-32
                  rounded-full
                  border-4
                  border-white
                  dark:border-black
                  object-cover
                  absolute
                  top-40
                "
              />

              {/* Edit Button */}
              <div className="flex justify-end mt-4">
                <button
                  className="
                    px-5
                    py-2
                    rounded-full
                    border
                    border-gray-300
                    dark:border-zinc-700
                    font-medium
                    hover:bg-gray-100
                    dark:hover:bg-zinc-900
                    transition
                  "
                >
                  Edit Profile
                </button>
              </div>

              {/* User Info */}
              <div className="mt-16">
                <h1 className="text-3xl font-bold">{data?.name}</h1>

                <p className="text-gray-500 dark:text-zinc-500 mt-1">
                  {data?.email}
                </p>

                <p className="mt-4 text-gray-700 dark:text-zinc-300">
                  Full Stack Developer | React | NestJS | TypeScript
                </p>

                <div className="flex gap-6 mt-5 text-sm">
                  <span>
                    <strong>120</strong> Following
                  </span>

                  <span>
                    <strong>80</strong> Followers
                  </span>

                  <span>
                    <strong>{data?.tweets.length}</strong> Posts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Header */}
          {/* Posts Header */}
          <div className="mt-8 border-t border-gray-200 dark:border-zinc-800">
            <div className="sticky top-0 bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold">Posts</h2>
            </div>

            {data?.tweets?.length > 0 ? (
              data.tweets.map((post: any) => (
                <div
                  key={post.id}
                  className="
          border-b
          border-gray-200
          dark:border-zinc-800
          p-4
          hover:bg-gray-50
          dark:hover:bg-zinc-900
          transition
        "
                >
                  <div className="flex gap-3">
                    <img
                      src={`https://i.pravatar.cc/100?img=${data?.id}`}
                      alt="profile"
                      className="w-11 h-11 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col">
                        <span className="font-semibold">{data?.name}</span>

                        <span className="text-sm text-gray-500">
                          {data?.email}
                        </span>
                      </div>

                      <p className="mt-2 text-[15px]">{post.tweet}</p>

                      {/* Tweet Images */}
                      {post.urls?.length > 0 && (
                        <div
                          className={`grid gap-2 mt-3 ${
                            post.urls.length === 1
                              ? "grid-cols-1"
                              : "grid-cols-2"
                          }`}
                        >
                          {post.urls.map((url: string, index: number) => (
                            <img
                              key={index}
                              src={url}
                              alt={`tweet-${index}`}
                              className="
                      w-full
                      max-h-96
                      object-cover
                      rounded-2xl
                      border
                      border-gray-200
                      dark:border-zinc-700
                    "
                            />
                          ))}
                        </div>
                      )}

                      <div className="mt-3 text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">
                No posts available
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
