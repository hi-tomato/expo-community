import AuthRoute from "@/components/AuthRoute";
import { useAuth } from "@/hooks/queries/useAuth";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingScreen = () => {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRoute>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
