import colors from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useCreateComment } from "@/hooks/queries/useCreateComment";
import { useDeleteComment } from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import InputField from "./InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentItem = ({ comment, isReply = false }: CommentItemProps) => {
  const { auth } = useAuth();
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={colors.BLACK}
          />
        )}
        <Profile
          onPress={() => {}}
          nickName={comment.isDeleted ? "(삭제됨)" : comment.user.nickname}
          createdAt={comment.createdAt}
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          option={
            auth?.id === comment.user.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
        editable={false}
      />
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
