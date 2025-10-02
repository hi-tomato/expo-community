import colors from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const PostWriteLayout = () => {
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
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerLeft: () => (
            <Link replace href={"/"} style={{ paddingRight: 5 }}>
              <Feather name="arrow-left" size={28} color={"black"} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "수정",
          headerShown: true,
          headerLeft: () => (
            <Link replace href={"/"} style={{ paddingRight: 5 }}>
              <Feather name="arrow-left" size={28} color={"black"} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default PostWriteLayout;

const styles = StyleSheet.create({});
