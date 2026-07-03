import { createLeaveRequestApi } from "@/services/leave.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLeaveR = () => {
  return useMutation({
    mutationFn: createLeaveRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      const status = error.response?.status;
      if (status === 409) {
        toast.info(error.response.data.message);
        return;
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
