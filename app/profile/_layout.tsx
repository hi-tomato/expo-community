import colors from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
const ProfileLayout = () => {
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
        name="[id]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
