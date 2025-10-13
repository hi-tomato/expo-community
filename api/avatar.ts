import axiosInstance from "./axios";

export const getHats = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/hats");

  return data;
};

export const getFaces = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/faces");

  return data;
};

export const getTops = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/tops");

  return data;
};

export const getBottoms = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/bottoms");

  return data;
};

export const getHands = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/hands");

  return data;
};

export const getSkins = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get("/avatar/skins");

  return data;
};
