import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";
import { axiosInstance } from "./axios";

type RequestBody = {
  email: string;
  password: string;
};

export const postSignUp = async (body: RequestBody): Promise<void> => {
  const { data } = await axiosInstance.post(`/auth/signup`, body);

  return data;
};

export const postLogin = async (
  body: RequestBody
): Promise<{ AccessToken: string }> => {
  const { data } = await axiosInstance.post(`/auth/signin`, body);

  return data;
};

export const getMe = async (): Promise<Profile> => {
  const accessToken = getSecureStore("accessToken");

  const { data } = await axiosInstance.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
