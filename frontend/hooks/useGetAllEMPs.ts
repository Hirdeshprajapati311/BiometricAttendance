import { getAllEmployees } from "@/services/admin.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllEmployees = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllEmployees,
  });
};
