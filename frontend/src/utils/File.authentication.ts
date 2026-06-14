import { toast } from "react-toastify";

export const fileAuthentication = (
  files: File[],
  prevFileLength: number
) => {
  const MAX_SIZE = 1 * 1024 * 1024;

  if (files.length + prevFileLength > 5) {
    toast.error("Not allowed more than 5 files");
    return false;
  }

  for (const file of files) {
    if (file.size > MAX_SIZE) {
      toast.error(`File size more than 1 MB: ${file.name}`);
      return false;
    }
  }

  return true;
};