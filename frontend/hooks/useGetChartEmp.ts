import { Chart, chartApi } from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useGetChartEmp = (filter: Chart["filter"]) => {
  return useQuery({
    queryKey: ["empChart", filter],
    queryFn: () => chartApi(filter),
  });
};
