import { approvalApi } from "@/services/leave.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetApproval = () => {
  return useMutation({
    mutationFn: approvalApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
