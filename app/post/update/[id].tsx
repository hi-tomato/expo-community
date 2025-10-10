import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import { useGetPostById } from "@/hooks/queries/useGetPostById";
import { useUpdatePost } from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteAttached: boolean;
};

const UpdatePostScreen = () => {
  const { id } = useLocalSearchParams();
  const inset = useSafeAreaInsets();
  const { data: post } = useGetPostById(Number(id));
  const updatePost = useUpdatePost();

  const navigation = useNavigation();
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      imageUris: post?.imageUris,
      isVoteAttached: post?.hasVote,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    updatePost.mutate({
      id: Number(id),
      body: {
        title: formValues.title,
        description: formValues.description,
        imageUris: formValues.imageUris,
      },
    });
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
      <KeyboardAwareScrollView contentContainerStyle={[styles.container]}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
};

export default UpdatePostScreen;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
