import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import axiosInstance from "./axios";

export const createPost = async (body: CreatePostDto) => {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
};

export const getPost = async (page = 1): Promise<Post[]> => {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
};

export const deletePost = async (id: number): Promise<number> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

export const updatePost = async ({
  id,
  body,
}: {
  id: number;
  body: CreatePostDto;
}): Promise<number> => {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const createVote = async ({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> => {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`
  );
  return data;
};
