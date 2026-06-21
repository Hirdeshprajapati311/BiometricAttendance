import AttendanceOverview from "@/components/AttendanceOverview";
import React from "react";
import AttendanceOverAdmin from "@/components/AttendanceOverAdmin";
import { role } from "../page";


export default function HistoryPage({ children }: { children: React.ReactNode }) {
  if (role === "admin") return <AttendanceOverAdmin />
  if (role === "employee") return <AttendanceOverview />
}

