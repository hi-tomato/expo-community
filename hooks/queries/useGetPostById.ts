import { getPostById } from "@/api/post";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetPostById = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POST_BY_ID],
    queryFn: () => getPostById(Number(id)),
  });
};
