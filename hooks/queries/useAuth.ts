import { getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryCleint";
import { removeHeaders, setHeaders } from "@/utils/header";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

export const useGetMe = () => {
  const { data, isError } = useQuery({
    queryKey: ["auth", "getMe"],
    queryFn: getMe,
  });

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
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
    onError: () => {
      //
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

  const logout = () => {
    removeHeaders("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
};
