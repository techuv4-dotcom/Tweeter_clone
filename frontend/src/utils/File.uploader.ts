import axiosInstance from "./Axios.instance";

interface UploadedFile {
  url: string;
  public_id: string;
}

export const uploadFile = async (
  files: File[]
): Promise<UploadedFile[]> => {
  const formData = new FormData();

  for (const file of files) {
    formData.append("image", file);
  }

  const response = await axiosInstance.post(
    "/file-handle",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};