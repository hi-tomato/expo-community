import { CreatePostDto, Post } from "@/types";
import axiosInstance from "./axios";

export const createPost = async (body: CreatePostDto) => {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
};

export const getPost = async (page = 1): Promise<Post[]> => {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
};
