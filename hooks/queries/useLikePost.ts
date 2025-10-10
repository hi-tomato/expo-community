import { likePost } from "@/api/post";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = () => {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);

      const userId = Number(user?.id);

      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST_BY_ID,
        postId,
      ]);

      const newPost = { ...previousPost };
      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;
      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1)
        : newPost.likes?.push({ userId: userId });
      console.log("previousPost", previousPost);

      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST_BY_ID, postId],
        newPost
      );
      return { previousPost, newPost };
    },

    onError: (err, newPost, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          [queryKeys.POST, queryKeys.GET_POST_BY_ID, context],
          context.previousPost
        );
      }
    },

    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST_BY_ID, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
};
