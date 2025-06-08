import React  from 'react'
import signUpimg from '../assets/signUpimg.png'






function signupImg() {

  return (
    <div className="relative h-screen bg-cover bg-center hidden lg:block" style={{ backgroundImage: `url(${signUpimg})` }}>
      <div className="absolute inset-0 "></div>
      <div className="relative flex items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold"></h1>
      </div>
    </div>

  )
}

export default signupImg