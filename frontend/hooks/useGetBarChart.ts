import { barChartApi } from "@/services/admin.api";
import { useQuery } from "@tanstack/react-query";

export const useGetBarChart = () => {
  return useQuery({
    queryKey: ["BarChart"],
    queryFn: barChartApi,
  });
};
