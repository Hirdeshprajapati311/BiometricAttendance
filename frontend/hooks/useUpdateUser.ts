import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApi, UpdateUserTypes } from "@/services/admin.api";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserTypes }) =>
      updateApi(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error: any) => {
      console.error(
        "Mutation error:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
