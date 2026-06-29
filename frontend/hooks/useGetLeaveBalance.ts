import { leaveBalanceApi } from "@/services/leave.api";
import { useQuery } from "@tanstack/react-query";

export const useGetLeaveBalance = () => {
  return useQuery({
    queryKey: ["leave-balance"],
    queryFn: leaveBalanceApi,
  });
};
