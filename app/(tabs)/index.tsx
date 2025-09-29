import CustomButton from "@/components/CustomButton";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <CustomButton label="버튼" size="medium" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
