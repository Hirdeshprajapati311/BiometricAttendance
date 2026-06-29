import { checkedInApi } from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useCheckedIn = () => {
  return useQuery({
    queryFn: checkedInApi,
    queryKey: ["checkedIn"],
  });
};
