import { RxAvatar } from 'react-icons/rx';
import { FaCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { role } from '@/app/(dashboard)/page';
import { Check } from 'lucide-react';

const CreateAccount = () => {

  const department = ["HR", "Engineering", "Marketing", "Finance", "Operations"]
  const designation = ["HR Manager", "Lead Developer", "Finance Director", "Operations Lead"]

  return (
    <div className='bg-white h-[calc(100vh-100px)] w-full rounded-lg flex shadow-lg flex-col justify-between'>
      <div className='w-full  font-lexend text-sm  p-6 h-full  flex flex-col '>


        <div>
          {/* Header */}
          <span className='font-semibold text-lg'>Create New Admin Account</span>

          <div className='flex flex-col w-full scroll-y-auto gap-4'>
            <span className='font-semibold text-lg'>Personal Info</span>

            <input type="text" placeholder='Full Name' className='bg-gray-100 placeholder:text-gray-400 border border-gray-400 w-full p-2 rounded-lg' />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder='example@domain.in'
                className='bg-blue-50 p-2 border border-gray-400 rounded-lg '
              />
              <input type="text" placeholder='Phone Number'
                className='bg-blue-50 p-2 border border-gray-400 rounded-lg'
              />
            </div>

            <input type="text" placeholder='Password' className='bg-gray-100 placeholder:text-gray-400 border border-gray-400 w-full p-2 rounded-lg' />



            <span className='font-semibold text-lg'>Role & Permissions</span>


            <div className='grid grid-cols-2 gap-4'>
              <select name="department" id="">
                <option value="">Department</option>
                {department.map((dep, i) => (
                  <option value={dep} key={i}>{dep}</option>
                ))}
              </select>


              <select name="designation" id="">
                <option value="">Designation</option>
                {designation.map((des, i) => (
                  <option value={des} key={i}>{des}</option>
                ))}
              </select>

            </div>

          </div>
        </div>








      </div>

      <div className='grid grid-cols-2 gap-4 px-6 py-4 bg-blue-50'>
        <button className='rounded-lg bg-gray-400 text-white cursor-pointer p-2'>Cancel Creation</button>
        <button className='text-white bg-primary rounded-lg cursor-pointer items-center justify-center flex p-2'><Check />&nbsp;Finalize & Create Admin</button>

      </div>
    </div>
  );
}

export default CreateAccount;
