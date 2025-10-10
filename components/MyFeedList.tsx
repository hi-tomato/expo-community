import colors from "@/constants";
import { useGetInfiniteMyPost } from "@/hooks/queries/useGetInfiniteMyPost";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";

const MyFeedList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);

  useScrollToTop(ref);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteMyPost();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <View>
      <FlatList
        ref={ref}
        data={posts?.pages.flat()}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FeedItem post={item} />}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default MyFeedList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
