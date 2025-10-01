import FeedList from "@/components/FeedList";
import colors from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {auth?.id && (
        <Pressable
          style={styles.iconContainer}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" color={colors.WHITE} size={24} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.ORANGE_600,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
