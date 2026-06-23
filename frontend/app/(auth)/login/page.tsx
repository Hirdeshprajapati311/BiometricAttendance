"use client"
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface dataTypes {
  email: string,
  password: string
}

const page = () => {

  const [data, setData] = useState<dataTypes>({
    email: "",
    password: ""
  })

  const { mutate: login, isPending } = useLogin();

  return (
    <div>
      <div className="relative w-screen h-screen overflow-hidden">
        <Image src="/arnifilogo.png" alt="Arnifi Logo" height={100} width={100} className="absolute z-10 top-5 left-5 rounded-2xl" />
        <Image src="/newLogin.png" alt="Login Background" fill className="object-cover" priority />


        <div className="relative w-full h-full z-10 items-center flex justify-center md:justify-start md:ml-30 font-serif">
          <div className="lg:w-2/5 xl:w-72  flex flex-col justify-center p-4 py-8 bg-white gap-4 border border-gray-200 rounded-sm shadow-lg">

            <input type="text" value={data.email} placeholder="Email Address" className="input" onChange={(e) => setData((prev) => ({
              ...prev,
              email: e.target.value,
            }))} />
            <input type="password" value={data.password} placeholder="Password" className="input" onChange={(e) => setData((prev) => ({
              ...prev,
              password: e.target.value
            }))} />
            <button disabled={isPending} onClick={() => login(data)} className="bg-primary rounded-sm p-2 text-white cursor-pointer">{isPending ? "Logging in..." : "Log In"}</button>

            <button className="border-0 bg-white text-primary  sm:text-sm md:text-base cursor-pointer">Forgot Password?</button>

            <div className="flex flex-row justify-center text-xs sm:text-sm md:text-base"><span>Create Organization!</span>&nbsp;<Link href="/register" className="text-primary">Sign Up</Link></div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
