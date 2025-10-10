import { createVote } from "@/api/post";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

export const useCreateVote = () => {
  return useMutation({
    mutationFn: createVote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, data.postId],
      });
    },
  });
};
