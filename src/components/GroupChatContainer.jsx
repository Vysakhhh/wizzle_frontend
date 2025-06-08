import React, { useEffect, useRef } from 'react'
import MessageHeader from './MessageHeader'
import MessageInput from './MessageInput'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { formatMessageTime } from '../services/formattedTime'

function GroupChatContainer() {
  const {
    selectedGroup,
    groupMessages,
    getGroupMessages,
    isGroupMessagesLoading,
    getRealTimeGroupMessages,
    disconnectRealTimeGroupMessages
  } = useChatStore()

  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    if (selectedGroup) {
      getGroupMessages(selectedGroup._id)
      getRealTimeGroupMessages()
    }

    return () => disconnectRealTimeGroupMessages()
  }, [disconnectRealTimeGroupMessages, getGroupMessages, getRealTimeGroupMessages, selectedGroup])

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [groupMessages])

  if (isGroupMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <MessageHeader isGroup />
        <MessageSkeleton />
        <MessageInput isGroup />
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <MessageHeader isGroup />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {groupMessages?.map((message, index) => {
          const isOwnMessage = message.senderId?._id === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              ref={index === groupMessages.length - 1 ? messageEndRef : null} // only last message gets ref
            >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={message.senderId?.profilePic || "/avatar.png"}
                    alt={message.senderId?.fullName || "User"}
                  />
                </div>
              </div>

              <div className='chat-footer my-1'>
                <span className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>

              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {!isOwnMessage && message.senderId?.fullName && (
                  <span className='text-left text-xs text-blue-800 mb-1'>
                    {message.senderId.fullName}
                  </span>
                )}

                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <MessageInput isGroup />
    </div>
  )
}

export default GroupChatContainer

