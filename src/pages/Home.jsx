import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'
import GroupChatContainer from '../components/GroupChatContainer'
import { useChatStore } from '../store/useChatStore'

function Home() {
  const { selectedUser, selectedGroup } = useChatStore() 

  return (
    <>
      <Navbar />

      <div data-theme="lemonade" className='min-h-screen '>
        <div className='flex items-center justify-center pt-12 px-4 '>
          <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] '>
            <div className='flex h-full rounded-lg overflow-hidden'>
              <Sidebar />

              {!selectedUser && !selectedGroup && <NoChatSelected />}

              {selectedUser && <ChatContainer />} 

              {selectedGroup && <GroupChatContainer />} 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
