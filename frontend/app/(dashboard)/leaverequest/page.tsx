import AdminLeaveRequest from "@/components/AdminLeaveRequest"
import EmployeeLeaveRequest from "@/components/EmployeeLeaveRequest"
import { role } from "../page"


export default function LeaveRequestPage() {


  if (role === "admin") return <AdminLeaveRequest />

  if (role === "employee") return <EmployeeLeaveRequest />

}