import { getMyLeavesApi, MyLeaveApi } from "@/services/leave.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyLeaves = ({ filter }: MyLeaveApi) => {
  return useQuery({
    queryKey: ["myLeaves", filter],
    queryFn: () => getMyLeavesApi({ filter }),
  });
};
