import { getLeavesApi, LeavesApi } from "@/services/leave.api";
import { useQuery } from "@tanstack/react-query";

export const useGetLeaves = ({ filter, search }: LeavesApi) => {
  return useQuery({
    queryKey: ["leaves", filter, search],
    queryFn: () => getLeavesApi({ filter, search }),
  });
};
