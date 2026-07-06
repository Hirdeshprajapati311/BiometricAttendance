import { AttendanceFilter, getAttendanceApi } from "@/services/attendance.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAttendance = ({ page, status, date }: AttendanceFilter) => {
  return useQuery({
    queryKey: ["Attendance", page, status, date],
    queryFn: () => getAttendanceApi({ page, status, date }),
  });
};
