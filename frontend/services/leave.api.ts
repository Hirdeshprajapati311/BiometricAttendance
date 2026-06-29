import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const leaveBalanceApi = async () => {
  const { data } = await axiosInstance(ApiRoutes.LEAVE_REQ.BALANCE);
  return data;
};
