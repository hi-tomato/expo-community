import { CreatePostDto } from "@/types";
import axiosInstance from "./axios";

export const createPost = async (body: CreatePostDto) => {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
};
