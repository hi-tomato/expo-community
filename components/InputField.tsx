import colors from "@/constants";
import React, { ForwardedRef, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
}
const InputField = (
  { label, variant = "filled", error = "", ...props }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) => {
  return (
    <View>
      <View>{label && <Text style={styles.label}>{label}</Text>}</View>
      <View
        style={[
          styles.container,
          styles[variant],
          props?.multiline && styles.multiLine,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          style={[styles.input]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          ref={ref}
          {...props}
        />
      </View>
      {Boolean(error) && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export default forwardRef(InputField);

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {},
  outlined: {},
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  errorMessage: {
    color: colors.RED_500,
    fontSize: 12,
    marginTop: 5,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
  multiLine: {
    alignItems: "flex-start",
    paddingVertical: 10,
    height: 188,
  },
});
