"use client"
import Image from "next/image";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterAccountData, RegisterApiData, registerSchema } from "@/validators/auth.validation";
import { useRegister } from "@/hooks/useRegister";

const RegisterPage = () => {
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterAccountData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      organizationName: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });


  const onSubmit = (data: RegisterAccountData) => {
    const { confirmPassword, ...registerData } = data;
    register(registerData as RegisterApiData);
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
        src="/register.png"
        alt="Login Background"
        fill
        className="object-cover"
        priority
      />

      <div className="relative w-full h-full z-10 items-center flex justify-center font-serif">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:w-2/5 xl:w-1/4 border border-gray-200 flex flex-col justify-center p-6 py-8 bg-white gap-4 rounded-sm shadow-lg"
        >
          <p className="w-full flex items-center justify-center font-semibold text-lg">
            Register Organization
          </p>

          {/* Name Field */}
          <div>
            <input
              {...registerField('name')}
              type="text"
              placeholder="Name *"
              className={`input ${errors.name ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <input
              {...registerField('email')}
              type="email"
              placeholder="Organization Email *"
              className={`input ${errors.email ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Organization Name Field */}
          <div>
            <input
              {...registerField('organizationName')}
              type="text"
              placeholder="Organization Name *"
              className={`input ${errors.organizationName ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.organizationName && (
              <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              {...registerField('password')}
              type="password"
              placeholder="Create Password *"
              className={`input ${errors.password ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              {...registerField('confirmPassword')}
              type="password"
              placeholder="Confirm Password *"
              className={`input ${errors.confirmPassword ? 'border-red-500 bg-red-50' : ''
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="border-0 bg-primary text-white rounded-md p-2 sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex flex-row justify-center text-xs sm:text-sm md:text-base">
            <span>Already have an account?</span>&nbsp;
            <Link href="/login" className="text-primary">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;