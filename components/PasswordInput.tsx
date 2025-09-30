import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

const PasswordInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={(t) => onChange(t, "password")}
        />
      )}
    />
  );
};

export default PasswordInput;
