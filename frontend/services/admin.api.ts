import { ApiRoutes } from "@/utils/apiRoutes";
import { axiosInstance } from "@/utils/axiosInstance";

export const createApi = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
}) => {
  const response = await axiosInstance.post(ApiRoutes.USER.CREATE_EMP, data);
  return response.data;
};

type Employee = {
  _id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  designation: string;
};

export type GetAllEmployeesResponse = {
  success: boolean;
  users: Employee[];
};

export const getAllEmployees = async (): Promise<GetAllEmployeesResponse> => {
  const { data } = await axiosInstance.get(ApiRoutes.USER.GET_ALL);
  return data;
};
