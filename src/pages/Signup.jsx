import React, { useState } from 'react'
import SignupImg from '../components/SignupImg'
import { Loader2, MessageCircleMore } from 'lucide-react';
import { User , Mail , Lock  } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast  from 'react-hot-toast';




function Signup() {

  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:""
  })
  console.log(formData);
  
   
  const {signUp,isSigningUp}=useAuthStore()

  const validateForm = () => {
      
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleRegister=(e)=>{
    e.preventDefault()

    const {fullName,email,password}=formData

    if(fullName && email && password){

       const validForm = validateForm();

      if (validForm === true) 
        signUp(formData);
        return;
    }
    else{
      toast.error("please fill the form completely")
    }
    

  }
  return (
    <>
   
    <div data-theme="lemonade"  className='min-h-screen grid lg:grid-cols-2 rounded-xl shadow-xl '>
      
      <div data-theme="halloween" className='flex flex-col justify-center items-center p-6 sm:p-12 rounded-xl '>
        <div className='w-full max-w-md space-y-8 rounded-xl p-5 shadow-2xl'>
         
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-warning/10 flex items-center  justify-center group-hover:bg-info/70 transition-colors'>
              
              <MessageCircleMore className='size-10  ' />
              </div>
              <h1 className='text-2xl text-amber-100 font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'> Get started with your free account</p>

            </div>

          </div>
          <form className='space-y-6'>
            <div className='form-control'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 z-5' />
                </div>
                <input type="text"  className={`input input-bordered w-full pl-10 rounded-xl`} placeholder='Full Name' value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName:e.target.value})}/>
              </div>
            </div>
            <div className='form-control'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 z-5' />
                </div>
                <input type="email"  className={`input input-bordered w-full pl-10 rounded-xl`} placeholder='Email' value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
              </div>
            </div>
            <div className='form-control'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-5 z-5' /> 
                </div>
                <input type="password"  className={`input input-bordered w-full pl-10 rounded-xl`} placeholder='Password' value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
              </div>
            </div>
           
           <button onClick={(e)=>handleRegister(e)} type="submit" className='btn bg-blue-600 rounded-xl w-full' disabled={isSigningUp}>
            {isSigningUp?
           
            (<>
            <Loader2  className="size-5 animate=spin"/>
                loading.....
            </>)
            :
           <p className='text-white'> Create Account</p>}
           </button>
          </form>
          <div className='text-center'>
           <p className='text-base-content/70'>
           Already have an account?
           <Link to={'/login'} className='link text-blue-400 ms-2'>Sign In</Link>
           </p>
          </div>
        </div>
      </div>
    {/* right side  */}
   <div className='p-6'>
   <SignupImg />
   </div>

    </div>


       <div>
       <footer className="mt-13 text-amber-900 font-medium">
        <p>&copy; 2023 Wizzle. All rights reserved.</p>
      </footer>
       </div>

    </>


     
  )
}

export default Signup