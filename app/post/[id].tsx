import AuthRoute from "@/components/AuthRoute";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import colors from "@/constants";
import { useGetPostById } from "@/hooks/queries/useGetPostById";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailPostScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPostById(Number(id));

  if (isPending || isError) {
    return <></>;
  }

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>댓글 {post.commentCount}</Text>
            </View>
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              rightElement={
                <Pressable style={styles.inputButtonContainer}>
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    width: "100%",
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});
