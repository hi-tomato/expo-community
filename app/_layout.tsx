import queryClient from "@/api/queryCleint";
import { useAuth } from "@/hooks/queries/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}

const RootNavigator = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
};
