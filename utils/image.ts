import { ImagePickerAsset } from "expo-image-picker";

export const getFormDataImages = (key: string, images: ImagePickerAsset[]) => {
  const formData = new FormData();

  images.forEach(({ uri, mimeType = "image/jpeg" }) => {
    const file = {
      uri,
      type: mimeType,
      name: uri.split("/").pop() || "image.jpg",
    };

    formData.append(key, file as any);
  });

  return formData;
};
