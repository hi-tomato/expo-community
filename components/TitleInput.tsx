import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

const TitleInput = () => {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      control={control}
      rules={{
        validate: (value) => {
          if (value.length <= 5) {
            return "제목을 5자 이상 기입해주세요.";
          }
        },
      }}
      name="title"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="제목"
          value={value}
          onChangeText={(t) => onChange(t, "title")}
          onSubmitEditing={() => setFocus("description")}
          error={error?.message}
        />
      )}
    ></Controller>
  );
};

export default TitleInput;
