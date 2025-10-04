import colors from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ImageZoomScreen = () => {
  const inset = useSafeAreaInsets();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return (
    <View style={[styles.container, { marginTop: inset.top }]}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="white" />
      </Pressable>

      <Image
        source={{ uri }}
        resizeMode="contain"
        style={[{ width: Dimensions.get("window").width, height: "100%" }]}
      />
    </View>
  );
};

export default ImageZoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
});
