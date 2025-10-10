import colors from "@/constants";
import { useGetInfinityUserPosts } from "@/hooks/queries/useGetInfinityUserPosts";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FeedItem from "./FeedItem";

interface UserFeedListProps {
  userId: number;
}

const UserFeedList = ({ userId }: UserFeedListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);

  useScrollToTop(ref);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinityUserPosts(userId);

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>게시물이 없습니다.</Text>
          </View>
        }
      />
    </View>
  );
};

export default UserFeedList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: "center",
  },
});
