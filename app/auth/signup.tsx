import FixedButtonCTA from "@/components/FixedButtonCTA";
import InputField from "@/components/InputField";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const SignUpScreen = () => {
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeInput = (text: string, name: string) => {
    setSignupValues((prev) => {
      return { ...prev, [name]: text };
    });
  };

  const handleSubmit = () => {
    if (signupValues.email.length === 0) {
      setError((prev) => ({ ...prev, email: "이메일을 입력하지 않았습니다." }));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={signupValues.email}
          onChangeText={(t) => handleChangeInput(t, "email")}
          error={error.email}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.password}
          onChangeText={(t) => handleChangeInput(t, "password")}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.passwordConfirm}
          onChangeText={(t) => handleChangeInput(t, "passwordConfirm")}
        />
      </View>
      <FixedButtonCTA label="회원가입하기" onPress={handleSubmit} />
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
