import { createComment } from "@/api/createComment";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });
    },
  });
};
