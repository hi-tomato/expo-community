import colors from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface TabProps {
  isActive: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const Tab = ({ isActive, onPress, children }: TabProps) => {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.WHITE,
  },
  activeContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.BLACK,
  },
  text: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  activeText: {
    fontWeight: 700,
    color: colors.BLACK,
  },
});
