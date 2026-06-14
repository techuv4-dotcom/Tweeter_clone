import type React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axiosInstance from "../../utils/Axios.instance";
import { toast } from "react-toastify";
import { useState } from "react";
import { Smile, ImageIcon } from "lucide-react";
import { fileAuthentication } from "../../utils/File.authentication";
import { uploadFile } from "../../utils/File.uploader";
interface createPostProps {
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  user: number;
}

const CreatePost: React.FC<createPostProps> = ({ setPosts, user }) => {
  const validationSchema = yup.object({
    tweet: yup.string().max(1000).required(),
  });

  interface tweets {
    tweet: string;
    urls: string[];
    public_id: string[];
  }

  const [uploadCount, setUploadCount] = useState(0);
  const [uploading, setUploading] = useState(false);

  interface uploadedFileResponse {
    url: string;
    public_id: string;
  }
  const [uploadedFileResponse, setUploadedFileResponse] = useState<
    uploadedFileResponse[]
  >([]);

  const initialValues: tweets = {
    tweet: "",
    urls: [],
    public_id: [],
  };
  const handleRemove = async (public_id: string) => {
    await axiosInstance.delete(`/file-handle/${public_id}`);
    setUploadedFileResponse((prev) =>
      prev.filter((img) => img.public_id !== public_id),
    );
  };

  const onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    try {
      if (!fileAuthentication(files, uploadedFileResponse.length)) {
        return;
      }
      setUploadCount(files.length);
      setUploading(true);
      const resp = await uploadFile(files);
      setUploadedFileResponse((prev) => [...prev, ...resp]);
    } catch (error) {
      throw error;
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const formik = useFormik<tweets>({
    validationSchema,
    initialValues,
    onSubmit: async (v) => {
      const allUrls = uploadedFileResponse.map((img) => img.url);
      const public_id = uploadedFileResponse.map((img) => img.public_id);

      const tweet = {
        tweet: v.tweet,
        urls: allUrls,
        public_id: public_id,
      };

      const response = await axiosInstance.post("/tweets", tweet);
      const data = response.data;
      if (data.statusCode !== 200) {
        toast.error(data.message);
        // console.log(response.data);
        return;
      }
      setUploadedFileResponse([]);
      formik.resetForm();

      setPosts((prev) => [data.tweetData, ...prev]);
      toast.success(response.data.message);
      // console.log(response.data);
    },
  });

  return (
    <div
      className="
      border-b
      border-gray-300
      dark:border-zinc-800
      px-6
      py-5
      flex
      gap-4
      bg-white
      dark:bg-black
      transition-all
      duration-300
    "
    >
      <img
        src={`https://i.pravatar.cc/100?img=${user}`}
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex-1">
          <textarea
            name="tweet"
            value={formik.values.tweet}
            onChange={formik.handleChange}
            rows={3}
            placeholder="What’s happening?"
            className="
          w-full
          bg-transparent
          resize-none
          outline-none
          text-xl
          text-black
          dark:text-white
          placeholder:text-gray-500
          dark:placeholder:text-zinc-500
        "
          />
          {formik.touched.tweet && formik.errors.tweet && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.tweet}</p>
          )}
          {uploading && (
            <div className="grid grid-cols-5 gap-2 mb-3">
              {Array.from({ length: uploadCount }).map((_, index) => (
                <div
                  key={index}
                  className="
        w-25
        h-32
        rounded-2xl
        border
        border-gray-300
        dark:border-zinc-700
        flex
        items-center
        justify-center
        animate-pulse
        "
                >
                  Uploading...
                </div>
              ))}
            </div>
          )}

          {/* {uploading && (
            <div className="grid grid-cols-5 gap-2 mb-3">
              <div className="relative">
                <div
                  className="
                    w-32
                    h-32
                    object-cover
                    rounded-2xl
                   border
                   border-gray-100
                   dark:border-zinc-700
                   flex
                   items-center
                   justify-center
                   "
                >
                  <span>Loading...</span>
                </div>
              </div>
            </div>
          )} */}

          {uploadedFileResponse.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mb-3">
              {uploadedFileResponse.map((img) => (
                <div key={img.public_id} className="relative">
                  <img
                    src={img.url}
                    alt={`preview-${img.public_id}`}
                    className="
                    w-32
                    h-32
                    object-cover
                    rounded-2xl
                   border
                   border-gray-300
                   dark:border-zinc-700
                   "
                    // className="w-20 h-20 object-cover rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemove(img.public_id)}
                    className="
                    absolute
                    top-0
                    right-0
                    w-5
                    h-5
                    rounded-full
                    bg-black
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                    "
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
          <div
            className="
    flex
    items-center
    justify-between
    mt-4
    pt-3
    border-t
    border-gray-200
    dark:border-zinc-800
  "
          >
            <div className="flex items-center gap-5 text-sky-500">
              <label
                className="
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    hover:bg-sky-100
    dark:hover:bg-zinc-900
    cursor-pointer
    transition
  "
              >
                <ImageIcon size={22} className="text-sky-500" />

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onchange(e)}
                />
              </label>

              <Smile
                size={20}
                className="cursor-pointer hover:scale-110 transition"
              />
            </div>

            <button
              type="submit"
              className="
            bg-sky-500
            hover:bg-sky-600
            transition
            px-6
            py-2
            rounded-full
            font-semibold
            text-white
          "
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
