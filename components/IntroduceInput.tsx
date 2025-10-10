import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function IntroduceInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="introduce"
      control={control}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          value={value}
          ref={ref}
          onChangeText={onChange}
          label="소개"
          placeholder="소개를 입력해주세요"
          returnKeyType="next"
          error={error?.message}
        />
      )}
    />
  );
}
