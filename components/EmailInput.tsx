import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import InputField from "./InputField";

const EmailInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={(t) => onChange(t, "email")}
        />
      )}
    />
  );
};

export default EmailInput;

const styles = StyleSheet.create({});
