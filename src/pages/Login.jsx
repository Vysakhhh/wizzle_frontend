import React, { useState } from 'react'
import SignupImg from '../components/SignupImg'
import { Loader2, MessageCircleMore } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast  from 'react-hot-toast';


function Login() {
    const [formData,setFormData]=useState({
      email:"",
      password:""
    })
 const {login,isLoggingIn}=useAuthStore()

 const validateForm = () => {
  if (!formData.email.trim()) return toast.error("Email is required");
  if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  if (!formData.password) return toast.error("Password is required");
  if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

  return true;
};


 const handleLogin=(e)=>{
  e.preventDefault()

  const{email,password}=formData

  if(email && password){

    const validForm = validateForm();
    if (validForm === true) 
    login(formData)
       return;
  }
  else{
    toast.error("fill the form completely")
  }

 }


  return (

    <>
    <div data-theme="lemonade"  className='min-h-screen grid lg:grid-cols-2 rounded-xl shadow-xl'>
    {/* left side */}

    <div data-theme="halloween" className='flex flex-col justify-center items-center p-6 sm:p-12 rounded-xl'>
      <div  className='w-full max-w-md space-y-8 rounded-xl p-5 shadow-2xl'>
       
        <div className='text-center mb-8'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl bg-warning/10 flex items-center  justify-center group-hover:bg-info/70 transition-colors'>
            
            <MessageCircleMore className='size-10' />
            </div>
            <h1 className='text-2xl font-bold mt-2 text-amber-100'>Welcome Back</h1>
            <p className='text-base-content/60'>Sign into your account</p>

          </div>

        </div>
        <form  className='space-y-6'>
          <div className='form-control'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Mail className='size-5  z-5' />
              </div>
              <input type="email"  className={`input input-bordered w-full pl-10`} placeholder='Email' value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
            </div>
          </div>
          <div className='form-control'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='size-5 z-5' /> 
              </div>
              <input type="password"  className={`input input-bordered w-full pl-10`} placeholder='Password' value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
            </div>
          </div>
         
         <button onClick={(e)=>handleLogin(e)} type="submit" className='btn btn-success w-full text-white font-medium' disabled={isLoggingIn}>
       { isLoggingIn ? 
        (
        <>
            <Loader2  className="size-5 animate=spin"/>
                loading.....
            </>)
            :
         ( 
          "Login"
        )}
         </button>
        </form>
        <div className='text-center'>
         <p className='text-base-content/70'>
         Don't have an account?
         <Link to={'/signup'} className='link text-blue-400  ms-2'>Sign Up</Link>
         </p>
        </div>
      </div>
    </div>
    
    
  {/* right side  */}
  <div className='p-6'>
 <SignupImg/>
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

export default Login