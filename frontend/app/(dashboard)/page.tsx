import { redirect } from "next/navigation"



export const role = "admin" as "admin" | "employee"


export default function Home() {
  if (role === "admin") redirect("/admin");
  if (role === "employee") redirect("/employee")
}