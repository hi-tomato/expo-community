import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import colors from "@/constants";
import { useCreateComment } from "@/hooks/queries/useCreateComment";
import { useGetPostById } from "@/hooks/queries/useGetPostById";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailPostScreen = () => {
  const [content, setContent] = useState<string>("");
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPostById(Number(id));
  const createComment = useCreateComment();

  const handleCreateComment = () => {
    if (content.trim().length === 0) {
      return;
    }

    createComment.mutate({
      content,
      postId: Number(post?.id),
    });

    setContent("");

    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  if (isPending || isError) {
    return <></>;
  }

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollViewRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>댓글 {post.commentCount}</Text>
            </View>

            {post.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleCreateComment}
              placeholder="댓글을 입력해주세요."
              onChangeText={(t) => setContent(t)}
              rightElement={
                <Pressable style={styles.inputButtonContainer}>
                  <Text
                    style={styles.inputButtonText}
                    disabled={createComment.isPending || !content}
                    onPress={handleCreateComment}
                  >
                    등록
                  </Text>
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
