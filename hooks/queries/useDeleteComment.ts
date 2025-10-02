import { deleteComment } from "@/api/createComment";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });
    },
  });
};
