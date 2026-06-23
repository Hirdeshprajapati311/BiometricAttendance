import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.LOGIN, data);
  return response.data;
};

export const registerApi = async (data: {
  name: string;
  password: string;
  organizationName: string;
}) => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.REGISTER, data);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.LOGOUT);
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await axiosInstance.post(ApiRoutes.AUTH.REFRESH_TOKEN);
  return response.data;
};
