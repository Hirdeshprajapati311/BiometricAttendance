import { getEmployeeAttendanceApi } from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyAttendance = (page: number = 1) => {
  return useQuery({
    queryKey: ["myAttendance", page],
    queryFn: () => getEmployeeAttendanceApi(page),
    staleTime: 5 * 60 * 1000,
  });
};
