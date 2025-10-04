import { uploadImages } from "@/api/image";
import { useMutation } from "@tanstack/react-query";

export const useUploadImages = () => {
  return useMutation({
    mutationFn: uploadImages,
  });
};
