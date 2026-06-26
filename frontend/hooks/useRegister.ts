import { registerApi } from "@/services/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed. Please try again");
    },
  });
};
