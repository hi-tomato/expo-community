import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

const EmailInput = () => {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      name="email"
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
            return "이메일 형식이 올바르지 않습니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={(t) => onChange(t, "email")}
          onSubmitEditing={() => setFocus("password")}
          error={error?.message}
        />
      )}
    />
  );
};

export default EmailInput;
