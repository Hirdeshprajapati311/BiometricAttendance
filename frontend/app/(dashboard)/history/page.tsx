"use client"
import AttendanceOverview from "@/components/AttendanceOverview";
import React from "react";
import AttendanceOverAdmin from "@/components/AttendanceOverAdmin";
import { useSelector } from "react-redux";


export default function HistoryPage({ children }: { children: React.ReactNode }) {

  const user = useSelector((state: any) => state.auth.user)
  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role === "admin") return <AttendanceOverAdmin />
  if (user.role === "employee") return <AttendanceOverview />
}

