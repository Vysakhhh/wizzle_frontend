import React from 'react'
import { X } from "lucide-react";
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

function MessageHeader() {
  const { selectedUser, setSelectedUser, selectedGroup, setSelectedGroup } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser && !selectedGroup) return null;

  if (selectedGroup) {
    const initials = selectedGroup.groupName
      ? selectedGroup.groupName
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
      : "GR";

    return (
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 bg-black text-white flex items-center justify-center rounded-full font-bold text-sm leading-none">
                {initials}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{selectedGroup.groupName}</h3>
              <p className="text-sm text-base-content/70">
                {selectedGroup.members?.length || 0} members
              </p>
            </div>
          </div>

          <button onClick={() => setSelectedGroup(null)}>
            <X />
          </button>
        </div>
      </div>
    );
  }

  // For one-on-one user chat
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt="" />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default MessageHeader;
