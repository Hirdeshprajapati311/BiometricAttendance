"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser } from "@/hooks/userCreateUser";
import { Check } from 'lucide-react';
import { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CreateAccountData, createAccountSchema } from '@/validators/auth.validation';

const CreateAccount = () => {
  const department = ["HR", "Engineering", "Marketing", "Finance", "Operations"];
  const designation = ["HR Manager", "Lead Developer", "Finance Director", "Operations Lead"];
  const roles = ["admin", "employee"];
  const [isOn, setIsOn] = useState(false);

  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      department: "",
      designation: ""
    },
    mode: "onChange" // Validate on every change
  });

  const role = watch('role');

  const onSubmit = (data: CreateAccountData) => {
    createUser(data);
  };

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white h-[calc(100vh-100px)] w-full rounded-lg flex shadow-lg flex-col justify-between'>
      <div className='w-full font-lexend text-sm p-6 flex flex-col'>
        <div>
          <span className='font-semibold text-lg'>Create New Admin Account</span>

          <div className='flex flex-col w-full scroll-y-auto custom-scrollbar gap-3'>
            <span className='font-semibold text-lg'>Personal Info</span>

            {/* Name Field */}
            <div>
              <input
                {...register('name')}
                autoComplete="off"
                type="text"
                placeholder='Username *'
                className={`bg-gray-100 placeholder:text-gray-400 border w-full p-2 rounded-lg ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-400'
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder='example@domain.in *'
                  className={`bg-blue-50 p-2 border rounded-lg w-full ${errors.email ? 'border-red-500' : 'border-gray-400'
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('phone')}
                  type="text"
                  placeholder='Phone Number *'
                  className={`bg-blue-50 p-2 border rounded-lg w-full ${errors.phone ? 'border-red-500' : 'border-gray-400'
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <input
                {...register('password')}
                autoComplete="new-password"
                type="password"
                placeholder='Password *'
                className={`bg-gray-100 placeholder:text-gray-400 border w-full p-2 rounded-lg ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-400'
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <span className='font-semibold text-lg'>Role & Permissions</span>

            {/* Role, Department, Designation */}
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <select
                  {...register('role')}
                  className={`w-full p-2 border rounded-lg ${errors.role ? 'border-red-500 bg-red-50' : 'border-gray-400'
                    }`}
                >
                  <option value="">Role *</option>
                  {roles.map((r, i) => (
                    <option value={r} key={i}>{r}</option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('department')}
                  className={`w-full p-2 border rounded-lg ${errors.department ? 'border-red-500 bg-red-50' : 'border-gray-400'
                    }`}
                >
                  <option value="">Department *</option>
                  {department.map((dep, i) => (
                    <option value={dep} key={i}>{dep}</option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('designation')}
                  className={`w-full p-2 border rounded-lg ${errors.designation ? 'border-red-500 bg-red-50' : 'border-gray-400'
                    }`}
                >
                  <option value="">Designation *</option>
                  {designation.map((des, i) => (
                    <option value={des} key={i}>{des}</option>
                  ))}
                </select>
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>
                )}
              </div>
            </div>

            {/* Permissions Section */}
            <div className="h-44 overflow-y-auto custom-scrollbar" style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className='flex flex-row w-full gap-2'>
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row gap-2">
                      <MdOutlineKeyboardArrowRight size={30} />
                      <div className="flex flex-col">
                        <span className="text-base font-semibold">User Management</span>
                        <p>permissions for user to manage the this part of application</p>
                      </div>
                    </div>
                    <button
                      onClick={toggle}
                      type="button"
                      className={`relative w-14 h-8 rounded-full transition-colors duration-300 cursor-pointer ${isOn ? 'bg-primary' : 'bg-gray-300'
                        }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-0'
                          }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 rounded-b-lg gap-4 px-6 py-4 bg-blue-50'>
        <button
          type="button"
          onClick={() => reset()}
          className='rounded-lg bg-gray-400 text-white cursor-pointer p-2 hover:bg-gray-500 transition-colors'
        >
          Cancel Creation
        </button>
        <button
          type="submit"
          disabled={isPending}
          className='text-white bg-primary rounded-lg cursor-pointer items-center justify-center flex p-2 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Check />&nbsp;
          {isPending ? "Creating..." : `Finalize & Create ${role === "employee" ? "Employee" : "Admin"}`}
        </button>
      </div>
    </form>
  );
};

export default CreateAccount;