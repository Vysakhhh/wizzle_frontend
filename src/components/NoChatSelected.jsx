import React from 'react'
import { MessageCircleMore } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function NoChatSelected() {
  const {authUser}=useAuthStore()
  return (
    <>
    
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
       
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="size-16 rounded-2xl bg-gray-800 flex items-center
             justify-center animate-bounce"
            >
              <MessageCircleMore className="size-9 text-amber-100" />
            </div>
          </div>
        </div>

        {authUser ?.role === "admin" ? (
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
          <p className="text-base-content/60">
          Ready to manage your users?
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">Welcome to Wizzle!</h2>
          <p className="text-base-content/60">
            Select a conversation to start chatting.
          </p>
        </div>
      )}
    </div>
      </div>
    
    
    
    
    </>
  )
}

export default NoChatSelected