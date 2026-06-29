import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const checkInApi = async () => {
  const { data } = await axiosInstance.post(ApiRoutes.ATTENDANCE.CHECK_IN);
  return data;
};

export const checkedInApi = async () => {
  const { data } = await axiosInstance.get(ApiRoutes.ATTENDANCE.CHECKED_IN);
  return data;
};
