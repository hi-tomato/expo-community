import EmailInput from "@/components/EmailInput";
import FixedButtonCTA from "@/components/FixedButtonCTA";
import PasswordInput from "@/components/PasswordInput";
import { useAuth } from "@/hooks/queries/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    loginMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedButtonCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
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
