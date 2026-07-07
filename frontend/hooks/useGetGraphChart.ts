import { graphChartApi } from "@/services/admin.api";
import { Chart } from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useGetGraphChart = (filter: Chart["filter"]) => {
  return useQuery({
    queryKey: ["GraphChart", filter],
    queryFn: () => graphChartApi(filter),
  });
};
