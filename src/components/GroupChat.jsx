import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';

function GroupChat() {
  const { groups, selectedGroup, setSelectedGroup, isGroupsLoading, getGroups, notifications, getNotifications, } = useChatStore();

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const getUnreadCount = (groupId) => {
    return notifications.filter(
      (n) => n.type === "group" && n.groupId === groupId
    ).length;
  };
  console.log(notifications);
  

  if (isGroupsLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      <div className="flex items-center gap-2 p-2 text-lg font-semibold text-gray-800">
        <Users className="size-5 text-purple-500" />
        <span>Groups</span>
      </div>

      {groups && groups.length > 0 ? (
        groups.map((group) => {
          const unreadCount = getUnreadCount(group._id);
          return (
            <button
              key={group._id}
              onClick={() => setSelectedGroup(group)}
              className={`
                w-full p-2 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${selectedGroup?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative w-12 h-12 mx-auto lg:mx-0">
                <div className="w-full h-full bg-black text-white flex items-center justify-center rounded-full font-bold text-sm">
                  {group.groupName
                    .split(" ")
                    .map(word => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>

                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </div>


              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{group.groupName}</div>
              </div>
            </button>
          );
        })
      ) : (
        <div className="text-blue-800 p-4">No groups available</div>
      )}
    </>
  );
}

export default GroupChat;

