import { dashboardApi } from "@/services/admin.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: ["AdminDashboard"],
    queryFn: dashboardApi,
  });
};
