import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

const PasswordInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="password"
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "비밀번호를 입력하지 않았습니다.";
          }
          if (!/[a-zA-Z]/.test(data)) {
            return "비밀번호는 영문자를 포함해야 합니다.";
          }
          if (!/[0-9]/.test(data)) {
            return "비밀번호는 숫자를 포함해야 합니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          value={value}
          onChangeText={(t) => onChange(t, "password")}
          error={error?.message}
        />
      )}
    />
  );
};

export default PasswordInput;
