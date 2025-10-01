import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import InputField from "./InputField";

const DescriptionInput = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (value) => {
          if (value.length === 0) {
            return "내용을 입력해주세요.";
          }
        },
      }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="내용"
          placeholder="내용을 입력해주세요"
          value={value}
          onChangeText={(t) => onChange(t, "description")}
          error={error?.message}
          multiline
        />
      )}
    />
  );
};

export default DescriptionInput;

const styles = StyleSheet.create({});
