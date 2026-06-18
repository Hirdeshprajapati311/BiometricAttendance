import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (

    <div className="relative w-screen h-screen overflow-hidden">
      <Image src="/arnifilogo.png" alt="Arnifi Logo" height={100} className="absolute z-10 top-5 left-5 rounded-2xl" />
      <Image src="/register.png" alt="Login Background" fill className="object-cover" priority />



      <div className="relative w-full h-full z-10 items-center flex justify-center font-serif">
        <div className="lg:w-2/5 xl:w-1/4 border border-gray-200 flex flex-col justify-center p-6  py-8 bg-white gap-4 rounded-sm shadow-lg">

          <input type="text" placeholder="Full Name" className="input" />
          <input type="text" placeholder="Company Email" className="input" />

          <input type="text" placeholder="Create Password" className="input" />

          <input type="text" placeholder="Confirm Password" className="input" />


          <button className="border-0 bg-primary text-white rounded-md p-2  sm:text-sm md:text-base">Create Account</button>

          <div className="flex flex-row justify-center text-xs sm:text-sm md:text-base"><span>Already have an account?</span>&nbsp;<Link href="/login" className="text-primary">Log In</Link></div>



        </div>
      </div>
    </div>

  );
}

export default page;
