import AuthRoute from "@/components/AuthRoute";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyScreen = () => {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>MyScreen</Text>
      </SafeAreaView>
    </AuthRoute>
  );
};

export default MyScreen;

const styles = StyleSheet.create({});
