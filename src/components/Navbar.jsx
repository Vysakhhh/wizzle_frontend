import React, { useState } from 'react'
import { MessageCircleMore } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import AddGroup from './AddGroup';
import { useChatStore } from '../store/useChatStore';








function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logOut } = useAuthStore()
  const { resetChat } = useChatStore()




const handleLogout=()=>{
  resetChat()
  logOut()
}

  return (

    <>

      <div className="w-full mx-auto px-4 h-16 bg-gray-800">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all" aria-label="Go to home">
              <div className="size-9 rounded-lg flex items-center justify-center">
                <MessageCircleMore className="size-8 text-amber-100" aria-hidden="true" />
              </div>
              <h1 className="text-lg text-white">Wizzle</h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden cursor-pointer">
              <span className="text-white">☰</span>

            </button>

          {authUser && authUser.role === "User" && <AddGroup />}

            <div className={`flex items-center gap-3 ${isOpen ? 'block' : 'hidden'} sm:flex`}>
              <Link to="/settings" className="btn btn-sm gap-2 transition-colors" aria-label="Go to settings">
                <Settings className="size-5" aria-hidden="true" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              <button onClick={handleLogout} className="flex gap-2 btn btn-sm items-center cursor-pointer transition-colors" aria-label="Logout">
                <LogOut className="size-5" aria-hidden="true" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              {authUser.role === "admin" && (
                <Link to="/admin" className="btn btn-sm gap-2 transition-colors" aria-label="Go to settings">
                  <LayoutDashboard className="size-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>






    </>

  );

}

export default Navbar