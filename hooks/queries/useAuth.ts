import { editProfile, getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryCleint";
import { queryKeys } from "@/constants";
import { removeHeaders, setHeaders } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

export const useGetMe = () => {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["auth", "getMe"],
    queryFn: getMe,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeaders("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeaders("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
};

export const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeaders(`Authorization`, `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
    onError: () => {
      //
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_ME], newProfile);
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {
      //
    },
  });
};

export const useAuth = () => {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignUp();
  const profileMutation = useUpdateProfile();

  const logout = () => {
    removeHeaders("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
      imageUri: data?.imageUri || "",
      introduce: data?.introduce || "",
    },
    loginMutation,
    signupMutation,
    logout,
    profileMutation,
  };
};
