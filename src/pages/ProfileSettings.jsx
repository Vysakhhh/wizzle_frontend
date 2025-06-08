import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Camera } from 'lucide-react';
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';


function Profile() {

  const {authUser,isUpdatingprofile,updateProfile}=useAuthStore()

 const [selectedImg,setSelectedImg]=useState(null);

  const handleImageUpload = async(e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if(!file){
      return;
    }

    const reader =new FileReader()
    reader.readAsDataURL(file);
     reader.onload=async()=>{
      const base64Image= reader.result;
      setSelectedImg(base64Image)
      await updateProfile({profilePic:base64Image})
     }

  }
  return (
    <>
      <Navbar />

      <div data-theme="lemonade" className='min-h-screen pt-3 shadow-xl '>
        <div className='max-w-2xl mx-auto p-4 py-8'>
          <div  data-theme="dark" className=' bg-base-300 rounded-xl p-6 space-y-8'>
            <div className='text-center'>
              <h1 className='text-3xl font-semibold text-amber-100 '>Profile</h1>
              <p className='mt-2 '>Your profile information</p>

            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img src={selectedImg ||authUser.profilePic || "/avatar.png"} alt="Profile" className="size-30 rounded-full object-cover border-4 " />
                <label
                  htmlFor="avatar-upload"
                  className={` absolute bottom-0 right-0  bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer  transition-all duration-200 ${isUpdatingprofile ? "animate-pulse pointer-events-none" :""} `} >
                  <Camera className="size-5 text-base-200" />
                  <input type="file" id="avatar-upload" className="hidden" accept="image/*"
                    onChange={handleImageUpload} disabled={isUpdatingprofile} />
                </label>
              </div>
              <p className="text-sm ">
              {  isUpdatingprofile ? "Uploading...." :
            "Click the camera icon to update your photo"
            }
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto p-8 py-8 ">
              <div className="space-y-1.5">
                <div className="text-medium  flex items-center gap-2">
                  <User className="size-4" />
                 Full Name
                </div>
                <p className="px-4 py-2 bg-base-200 rounded-lg border ">{authUser?.fullName}</p>
              </div>

              <div className="space-y-1.5">
                <div className="text-medium  flex items-center gap-2">
                  <Mail className="size-4" />
                 Email Address
                </div>
                <p className="px-4 py-2 bg-base-200 rounded-lg border">{authUser?.email}</p>
              </div>

              <div  className="mt-4 bg-base-100 rounded-xl p-6">
                <h2 className="text-lg font-medium  mb-4  text-amber-100">Account Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Account Status</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>
            </div>


          </div>



        </div>


      </div>














    </>
  )
}

export default Profile