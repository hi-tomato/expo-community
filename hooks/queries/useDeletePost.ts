import { deletePost } from "@/api/post";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
};
