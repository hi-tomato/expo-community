import axios from "axios";
import { Platform } from "react-native";

export const axiosInstance = axios.create({
  baseURL:
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_API_URL
      : "http://10.0.2.2:3030",
});
