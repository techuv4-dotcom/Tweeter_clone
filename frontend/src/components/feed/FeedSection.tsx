import type React from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../../utils/Axios.instance";
import CreatePost from "./CreatePost";

interface Props {
  user: any;
}

const FeedSection: React.FC<Props> = ({ user }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    const response = await axiosInstance.get(`/tweets?page=${page}&limit=5`);

    const newPosts = response.data;

    setPosts((prev) => [...prev, ...newPosts]);

    if (newPosts.length < 5) {
      setHasMore(false);
    }

    setPage((prev) => prev + 1);
  };

  const itemTemplate = (post: any) => {
    return (
      <div
        key={post.id}
        className="
            border-b
            border-gray-300
            dark:border-zinc-800
            px-6
            py-5
            hover:bg-gray-100
            dark:hover:bg-zinc-950
            transition
          "
      >
        <div className="flex gap-4">
          <img
            src={`https://i.pravatar.cc/100?img=${post.user.id}`}
            alt="user"
            className="w-12 h-12 rounded-full"
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.user.name}</h3>

                <span className="text-gray-500 text-sm">
                  • {new Date(post.createdAt).toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">• {post.email}</span>
              </div>

              {/* {user?.id === post.user.id && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                )} */}
            </div>

            <p className="mt-3 text-[15px] leading-7">{post.tweet}</p>

            {post.urls?.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {post.urls.map((url: string, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt=""
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="
          flex-1
          border-r
          border-gray-300
          dark:border-zinc-800
          min-h-screen
          max-w-2xl
          bg-white
          dark:bg-black
        "
    >
      {/* Header */}
      <div
        className="
            sticky
            top-0
            z-50
            bg-white/80
            dark:bg-black/80
            backdrop-blur-md
            border-b
            border-gray-300
            dark:border-zinc-800
            px-6
            py-4
          "
      >
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      <CreatePost setPosts={setPosts} user={user?.id} />

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
      >
        {posts.map((post) => (
          <div key={post.id}>{itemTemplate(post)}</div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default FeedSection;
