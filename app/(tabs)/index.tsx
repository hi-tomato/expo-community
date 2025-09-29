import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <CustomButton
        label="버튼"
        size="medium"
        onPress={() => router.push("/auth")}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
