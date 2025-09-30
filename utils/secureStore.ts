import * as SecureStore from "expo-secure-store";

export const saveSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureStore = async (key: string) => {
  const result = (await SecureStore.getItemAsync(key)) ?? null;

  return result;
};

export const deleteSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
