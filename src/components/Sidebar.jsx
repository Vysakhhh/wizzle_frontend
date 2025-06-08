import React, { useEffect, useState } from 'react'
import { UserRoundSearch } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import GroupChat from './GroupChat';




function Sidebar() {

  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const { onlineUsers, authUser } = useAuthStore()

  const [showOnlineUsers, setShowOnlineUsers] = useState(false)

  const [searchKey, setSearchKey] = useState("")



  console.log(users);


  useEffect(() => {

    getUsers()

  }, [getUsers])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchKey.toLowerCase());
    const isOnline = onlineUsers.includes(user._id);
    return (
      (!showOnlineUsers || isOnline) &&
      matchesSearch
    );
  });

  if (isUsersLoading) {
    return <SidebarSkeleton />
  }


  return (
    <>
      <aside className='h-full w-20 lg:w-72 border-r border-base-200 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-200 w-full p-5'>

          <div className="hidden lg:flex items-center gap-2 w-full max-w-md relative">
            <input onChange={(e) => setSearchKey(e.target.value)} type="search" className="input input-bordered w-full pl-10" placeholder="Search..." />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <UserRoundSearch className="size-5 text-gray-800" />
            </div>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineUsers}
                onChange={(e) => setShowOnlineUsers(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-xs">Show online only</span>
            </label>
            {/* <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span> */}
          </div>


        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center font-medium text-blue-400 py-4">No online users</div>
          )}
        </div>

        {authUser?.role !== "admin" && (
          <div className='border-t border-base-200 w-full py-3 my-2'>
            <GroupChat />
          </div>
        )}



      </aside>












    </>
  )
}

export default Sidebar