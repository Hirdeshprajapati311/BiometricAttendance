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

export interface MyLeaveApi {
  filter: string;
}

export const getMyLeavesApi = async ({ filter }: MyLeaveApi) => {
  const { data } = await axiosInstance.get(ApiRoutes.LEAVE_REQ.EMPLOYEE, {
    params: {
      filter,
    },
  });
  return data;
};

export interface LeavesApi {
  filter: string;
  search: string;
}

export const getLeavesApi = async ({ filter, search }: LeavesApi) => {
  const { data } = await axiosInstance.get(ApiRoutes.LEAVE_REQ.ADMIN, {
    params: {
      filter,
      search,
    },
  });
  return data;
};

export const approvalApi = async ({
  id,
  status,
  comment,
}: {
  id: string;
  status: "approved" | "rejected";
  comment: string;
}) => {
  const { data } = await axiosInstance.patch(ApiRoutes.LEAVE_REQ.APPROVAL(id), {
    status,
    comment,
  });
  return data;
};

export const withdrawApi = async ({ id }: { id: string }) => {
  const { data } = await axiosInstance.patch(ApiRoutes.LEAVE_REQ.WITHDRAW(id), {
    status: "withdrawn",
  });
  return data;
};
