import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="relative w-screen h-screen overflow-hidden">
        <Image src="/arnifilogo.png" alt="Arnifi Logo" height={100} width={100} className="absolute z-10 top-5 left-5 rounded-2xl" />
        <Image src="/newLogin.png" alt="Login Background" fill className="object-cover" priority />


        <div className="relative w-full h-full z-10 items-center flex justify-center md:justify-start md:ml-30 font-serif">
          <div className="lg:w-2/5 xl:w-72  flex flex-col justify-center p-4 py-8 bg-white gap-4 border border-gray-200 rounded-sm shadow-lg">

            <input type="text" placeholder="Email Address" className="input" />
            <input type="text" placeholder="Password" className="input" />
            <button className="bg-primary rounded-sm p-2 text-white">Log In</button>

            <button className="border-0 bg-white text-primary  sm:text-sm md:text-base">Forgot Password?</button>

            <div className="flex flex-row justify-center text-xs sm:text-sm md:text-base"><span>Don't have an account?</span>&nbsp;<Link href="/register" className="text-primary">Sign Up</Link></div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
