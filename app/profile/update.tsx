import { baseUrls } from "@/api/axios";
import CustomButton from "@/components/CustomButton";
import FixedButtonCTA from "@/components/FixedButtonCTA";
import IntroduceInput from "@/components/IntroduceInput";
import NicknameInput from "@/components/NicknameInput";
import colors from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = {
  nickname: string;
  introduce: string;
};

const UpdateProfileScreen = () => {
  const { auth, profileMutation } = useAuth();
  const profileForm = useForm({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    profileMutation.mutate(formValues, {
      onSuccess: () =>
        Toast.show({ type: "success", text1: "프로필 업데이트 성공" }),
    });
  };

  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              auth.imageUri
                ? {
                    uri: `${
                      Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
                    }/${auth.imageUri}`,
                  }
                : require("@/assets/images/default-avatar.png")
            }
          />
          <CustomButton
            size="medium"
            variant="outlined"
            label="아바타 변경"
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={() => router.push("/profile/avatar")}
          />
        </View>

        <View style={styles.inputContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>

        <FixedButtonCTA
          label="저장"
          onPress={profileForm.handleSubmit(onSubmit)}
        />
      </View>
    </FormProvider>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  inputContainer: { gap: 16 },
});
