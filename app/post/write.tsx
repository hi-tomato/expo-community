import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type PostFormValues = {
  title: string;
  description: string;
};

const PostWriteScreen = () => {
  const formValues = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <View style={styles.container}>
      <FormProvider {...formValues}>
        <TitleInput />
        <DescriptionInput />
      </FormProvider>
    </View>
  );
};

export default PostWriteScreen;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
