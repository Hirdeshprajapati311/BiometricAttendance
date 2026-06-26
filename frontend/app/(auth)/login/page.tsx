"use client"
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginAccountData, loginSchema } from "@/validators/auth.validation";

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginAccountData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = (data: LoginAccountData) => {
    login(data);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/arnifilogo.png"
        alt="Arnifi Logo"
        height={100}
        width={100}
        className="absolute z-10 top-5 left-5 rounded-2xl"
      />
      <Image
        src="/newLogin.png"
        alt="Login Background"
        fill
        className="object-cover"
        priority
      />

      <div className="relative w-full h-full z-10 items-center flex justify-center md:justify-start md:ml-30 font-serif">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-2/5 xl:w-72 flex flex-col justify-center p-4 py-8 bg-white gap-4 border border-gray-200 rounded-sm shadow-lg"
        >
          {/* Email Field */}
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email Address"
              className={`input ${errors.email ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={`input ${errors.password ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary rounded-sm p-2 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>

          <button
            type="button"
            className="border-0 bg-white text-primary sm:text-sm md:text-base cursor-pointer"
          >
            Forgot Password?
          </button>

          <div className="flex flex-row justify-center text-xs sm:text-sm md:text-base">
            <span>Create Organization!</span>&nbsp;
            <Link href="/register" className="text-primary">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;