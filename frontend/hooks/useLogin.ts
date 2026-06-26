import { loginApi } from "@/services/auth.api";
import { setCredentials } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("SUCCESS", data);
      dispatch(
        setCredentials({ accessToken: data.accessToken, user: data.user }),
      );
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/employee");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};
