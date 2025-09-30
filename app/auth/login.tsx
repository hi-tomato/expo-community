import EmailInput from "@/components/EmailInput";
import FixedButtonCTA from "@/components/FixedButtonCTA";
import PasswordInput from "@/components/PasswordInput";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

const LoginScreen = () => {
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedButtonCTA label="로그인하기" onPress={() => {}} />
    </FormProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
