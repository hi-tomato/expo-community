import { useAuth } from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";

type AuthRouteProps = {
  children: ReactNode;
};

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.push("/auth");
  });
  return <>{children}</>;
};

export default AuthRoute;
