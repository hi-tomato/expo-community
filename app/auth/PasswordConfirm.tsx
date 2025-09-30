import InputField from "@/components/InputField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const PasswordConfirmInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="passwordConfirm"
      render={({ field: { value, onChange } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={(t) => onChange(t, "passwordConfirm")}
        />
      )}
    />
  );
};

export default PasswordConfirmInput;
