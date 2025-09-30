import EmailInput from "@/components/EmailInput";
import FixedButtonCTA from "@/components/FixedButtonCTA";
import PasswordInput from "@/components/PasswordInput";
import { useAuth } from "@/hooks/queries/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import PasswordConfirmInput from "./PasswordConfirm";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpScreen = () => {
  const { signupMutation } = useAuth();

  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    signupMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
        <PasswordConfirmInput />
      </View>
      <FixedButtonCTA
        label="회원가입하기"
        onPress={signupForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
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
