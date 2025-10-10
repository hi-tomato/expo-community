import colors from "@/constants";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
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
  rightElement?: ReactNode;
}
const InputField = (
  {
    label,
    variant = "filled",
    error = "",
    rightElement,
    ...props
  }: InputFieldProps,
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
          style={[styles.input, styles[`${variant}Text`]]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          ref={ref}
          {...props}
        />
        {rightElement && rightElement}
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
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standardText: {
    color: colors.BLACK,
  },
  filledText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
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
