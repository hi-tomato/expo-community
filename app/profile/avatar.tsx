import { baseUrls } from "@/api/axios";
import AvatarItem from "@/components/AvatarItem";
import FixedButtonCTA from "@/components/FixedButtonCTA";
import Tab from "@/components/Tab";
import colors from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useGetAvatarItems } from "@/hooks/queries/useGetAvatarItems";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { SvgUri } from "react-native-svg";
import Toast from "react-native-toast-message";

const AvatarScreen = () => {
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const { auth, profileMutation } = useAuth();
  const [avatarItems, setAvatarItems] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "",
  });

  const getImageId = (uri: string) => {
    const fileName = uri.split("/").pop() ?? "";
    const [id] = fileName?.split(".");
    return id;
  };

  const handlePressItem = (name: string, item: string) => {
    setAvatarItems((prev) => ({ ...prev, [name]: getImageId(item) }));
  };

  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const handlePressTab = (index: number) => {
    setCurrentTab(index);
    pagerViewRef.current?.setPage(index);
  };

  const handleSaveAvatar = () => {
    profileMutation.mutate(avatarItems, {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: "아바타 변경 완료",
        }),
    });
  };

  const getAvatarItemUri = (category: string, id?: string) => {
    const baseUrl = Platform.OS === "ios" ? baseUrls.ios : baseUrls.android;
    if (category === "default" || !Boolean(id)) {
      return `${baseUrl}/default/frame.svg`;
    }
    return `${baseUrl}/items/${category}/${id}.svg`;
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {avatarItems.hatId && (
              <SvgUri
                uri={getAvatarItemUri("hats", avatarItems.hatId)}
                style={[styles.avatar, { zIndex: 70 }]}
              />
            )}
            {avatarItems.faceId && (
              <SvgUri
                uri={getAvatarItemUri("faces", avatarItems.faceId)}
                style={[styles.avatar, { zIndex: 60 }]}
              />
            )}
            {avatarItems.topId && (
              <SvgUri
                uri={getAvatarItemUri("tops", avatarItems.topId)}
                style={[styles.avatar, { zIndex: 50 }]}
              />
            )}
            {avatarItems.bottomId && (
              <SvgUri
                uri={getAvatarItemUri("bottoms", avatarItems.bottomId)}
                style={[styles.avatar, { zIndex: 40 }]}
              />
            )}

            {avatarItems.bottomId && (
              <SvgUri
                uri={getAvatarItemUri("bottoms", avatarItems.bottomId)}
                style={[styles.avatar, { zIndex: 40 }]}
              />
            )}

            <SvgUri
              uri={getAvatarItemUri("default")}
              style={[styles.avatar, { zIndex: 30 }]}
            />
            {avatarItems.skinId && (
              <SvgUri
                uri={getAvatarItemUri("skins", avatarItems.skinId)}
                style={[styles.avatar, { zIndex: 20 }]}
              />
            )}
            {avatarItems.handId && (
              <SvgUri
                uri={getAvatarItemUri("hands", avatarItems.handId)}
                style={[styles.avatar, { zIndex: 10 }]}
              />
            )}
          </View>
        </View>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부"].map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          {[
            { data: hats, name: "hatId", id: avatarItems.hatId },
            { data: faces, name: "faceId", id: avatarItems.faceId },
            { data: tops, name: "topId", id: avatarItems.topId },
            { data: bottoms, name: "bottomId", id: avatarItems.bottomId },
            { data: hands, name: "handId", id: avatarItems.handId },
            { data: skins, name: "skinId", id: avatarItems.skinId },
          ].map((list) => (
            <FlatList
              key={list.name}
              data={list.data}
              keyExtractor={(item, index) => String(index)}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <AvatarItem
                  uri={item}
                  isSelected={getImageId(item) === list.id}
                  onPress={() => handlePressItem(list.name, item)}
                />
              )}
            />
          ))}
        </PagerView>
      </View>

      <FixedButtonCTA label="저장" onPress={handleSaveAvatar} />
    </>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 120,
  },
  headerContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
  },
  avatar: {
    width: 229,
    height: 229,
    position: "absolute",
  },
});
