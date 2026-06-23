"use client"
import AdminLeaveRequest from "@/components/AdminLeaveRequest"
import EmployeeLeaveRequest from "@/components/EmployeeLeaveRequest"
import { useSelector } from "react-redux"



export default function LeaveRequestPage() {

  const user = useSelector((state: any) => state.auth.user)


  if (!user) {
    return <div>Loading...</div>;
  }
  if (user.role === "admin") return <AdminLeaveRequest />

  if (user.role === "employee") return <EmployeeLeaveRequest />

}