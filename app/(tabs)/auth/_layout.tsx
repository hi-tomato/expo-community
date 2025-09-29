import colors from "@/constants";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "내 프로필",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace>
              <Foundation name="home" size={28} color={"black"} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
