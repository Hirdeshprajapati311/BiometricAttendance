import {
  AttendanceFilter,
  getEmployeeAttendanceApi,
} from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyAttendance = ({
  page,
  status,
  date,
}: AttendanceFilter) => {
  return useQuery({
    queryKey: ["myAttendance", { page, status, date }],
    queryFn: () => getEmployeeAttendanceApi({ page, status, date }),
    staleTime: 5 * 60 * 1000,
  });
};
