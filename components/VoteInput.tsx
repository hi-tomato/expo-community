import colors from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import InputField from "./InputField";

interface VoteInputProps {
  idx: number;
  onRemove: () => void;
}

const VoteInput = ({ idx, onRemove }: VoteInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={`voteOptions.${idx}.content`}
      rules={{
        validate: (date: string) => {
          if (date.length === 0) {
            return "내용을 입력해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          variant="standard"
          onChangeText={onChange}
          value={value}
          error={error?.message}
          rightElement={
            <Pressable onPress={onRemove}>
              <Ionicons name="close" size={20} color={colors.GRAY_500} />
            </Pressable>
          }
        />
      )}
    />
  );
};

export default VoteInput;

const styles = StyleSheet.create({});
