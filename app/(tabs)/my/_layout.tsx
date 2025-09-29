import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const MyLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "내 프로필", headerShown: false }}
      />
    </Stack>
  );
};

export default MyLayout;

const styles = StyleSheet.create({});
