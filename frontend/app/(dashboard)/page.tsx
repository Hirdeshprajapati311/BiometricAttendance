"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSelector } from "react-redux";





export default function Home() {

  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user)


  useEffect(() => {
    if (!user) {
      router.replace("/login")
      return;
    }
    if (user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/employee")
    }
  })
}