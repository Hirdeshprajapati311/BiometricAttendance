import { createApi } from "@/services/admin.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};
