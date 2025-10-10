import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function NicknameInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="nickname"
      control={control}
      rules={{
        validate: (data) => {
          if (data.length < 2) {
            return "닉네임은 2자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          value={value}
          onChangeText={onChange}
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          error={error?.message}
        />
      )}
    />
  );
}
