import axiosInstance from "@/api/axios";

export const setHeaders = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

export const removeHeaders = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};
