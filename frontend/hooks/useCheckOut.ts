import { checkOutApi } from "@/services/attendance.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkOutApi,
    mutationKey: ["checkout"],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["checkedIn"] });
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: (error: any) => {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message || "Something went wrong";

      if (code === "MIN_HOURS_NOT_MET") {
        toast.info(message);
      } else {
        toast.error(message);
      }
    },
  });
};
