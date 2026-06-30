import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export interface Attendance {
  _id: string;
  employeeId: string;
  date: string;
  day: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  limit?: number;
}

export interface GetMyAttendanceResponse {
  success: boolean;
  attendance: Attendance[];
  pagination: Pagination;
}

export const getEmployeeAttendanceApi = async (
  page: number,
): Promise<GetMyAttendanceResponse> => {
  const { data } = await axiosInstance.get(
    `${ApiRoutes.ATTENDANCE.EMPLOYEE}?page=${page}`,
  );
  return data;
};

export const checkInApi = async () => {
  const { data } = await axiosInstance.post(ApiRoutes.ATTENDANCE.CHECK_IN);
  return data;
};

export const checkedInApi = async () => {
  const { data } = await axiosInstance.get(ApiRoutes.ATTENDANCE.CHECKED_IN);
  return data;
};

export const checkOutApi = async () => {
  const { data } = await axiosInstance.patch(ApiRoutes.ATTENDANCE.CHECK_OUT);
  return data;
};
