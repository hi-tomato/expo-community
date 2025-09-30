import { router, useFocusEffect } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyScreen = () => {
  useFocusEffect(() => {
    router.replace("/auth");
  });
  return (
    <SafeAreaView>
      <Text>MyScreen</Text>
    </SafeAreaView>
  );
};

export default MyScreen;

const styles = StyleSheet.create({});
