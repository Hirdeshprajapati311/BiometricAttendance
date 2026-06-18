import { redirect } from "next/navigation"



export default function Home() {
  const role = "admin"
  if (role === "admin") redirect("/admin");
  if (role === "employee") redirect("/employee")
}