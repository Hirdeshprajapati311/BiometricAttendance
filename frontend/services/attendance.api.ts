import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

interface EmployeeId {
  _id: string;
  empId?: string;
  name?: string;
}

export interface Attendance {
  _id: string;
  employeeId: EmployeeId;
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

export interface AttendanceFilter {
  page: number;
  status?: string;
  date?: string;
}

export const getEmployeeAttendanceApi = async ({
  page = 1,
  status,
  date,
}: AttendanceFilter): Promise<GetMyAttendanceResponse> => {
  const { data } = await axiosInstance.get(ApiRoutes.ATTENDANCE.EMPLOYEE, {
    params: {
      page,
      status,
      date,
    },
  });
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

export interface Chart {
  filter: string;
}

export const chartApi = async (filter: Chart["filter"]) => {
  const { data } = await axiosInstance.get(ApiRoutes.ATTENDANCE.CHART, {
    params: {
      filter,
    },
  });
  return data;
};

export const getAttendanceApi = async ({
  page = 1,
  status,
  date,
}: AttendanceFilter): Promise<GetMyAttendanceResponse> => {
  const { data } = await axiosInstance.get(ApiRoutes.ATTENDANCE.ADMIN, {
    params: {
      page,
      status,
      date,
    },
  });

  console.log("Response:", data);
  return data;
};
