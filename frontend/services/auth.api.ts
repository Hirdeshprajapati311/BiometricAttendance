import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.LOGIN, data);
  return response.data;
};

export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}) => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.REGISTER, data);
  return response.data;
};
