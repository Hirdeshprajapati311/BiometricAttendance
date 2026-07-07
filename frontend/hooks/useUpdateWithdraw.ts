import { withdrawApi } from "@/services/leave.api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"




export const useUpdateWithdraw = () => {
  return useMutation({
    mutationFn: withdrawApi,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error:any) => {
      toast.error(error.data?.response.message || "Something went wrong")
    }
  })
}