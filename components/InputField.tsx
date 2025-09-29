import colors from "@/constants";
import React from "react";
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
}
const InputField = ({
  label,
  variant = "filled",
  ...props
}: InputFieldProps) => {
  return (
    <View>
      <View>{label && <Text style={styles.label}>{label}</Text>}</View>
      <View style={[styles.container, styles[variant]]}>
        <TextInput style={styles.input} {...props} />
      </View>
    </View>
  );
};

export default InputField;

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
});
