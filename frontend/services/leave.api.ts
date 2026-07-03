import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const leaveBalanceApi = async () => {
  const { data } = await axiosInstance(ApiRoutes.LEAVE_REQ.BALANCE);
  return data;
};

export interface LeaveRequestData {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export const createLeaveRequestApi = async (leaveData: LeaveRequestData) => {
  const { data } = await axiosInstance.post(
    ApiRoutes.LEAVE_REQ.CREATE,
    leaveData,
  );
  return data;
};
