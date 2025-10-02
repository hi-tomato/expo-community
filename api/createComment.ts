import { CreateCommentDto } from "@/types";
import axiosInstance from "./axios";

export const createComment = async (body: CreateCommentDto) => {
  const { data } = await axiosInstance.post("/comments", body);

  return data;
};

export const deleteComment = async (id: number) => {
  const { data } = await axiosInstance.delete(`/comments/${id}`);

  return data;
};
