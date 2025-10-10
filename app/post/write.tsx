import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import ImagePreviewList from "@/components/ImagePreviewList";
import PostWriteFooter from "@/components/PostWriteFooter";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import VoteModal from "@/components/VoteModal";
import { useCreatePost } from "@/hooks/queries/useCreatePost";
import { ImageUri, VoteOption } from "@/types";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  voteOptions: VoteOption[];
  isVoteAttached: boolean;
};

const PostWriteScreen = () => {
  const navigation = useNavigation();
  const createPost = useCreatePost();
  const insets = useSafeAreaInsets();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [
        {
          displayPriority: 0,
          content: "",
        },
      ],
    },
  });

  const onSubmit = (formValues: FormValues) => {
    createPost.mutate(formValues);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, [navigation]);

  return (
    <FormProvider {...postForm}>
      <SafeAreaView>
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
        >
          <TitleInput />
          <DescriptionInput />
          <VoteAttached />
        </KeyboardAwareScrollView>
        <PostWriteFooter />

        <ImagePreviewList imageUris={postForm.watch().imageUris} />
        <VoteModal />
      </SafeAreaView>
    </FormProvider>
  );
};

export default PostWriteScreen;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
