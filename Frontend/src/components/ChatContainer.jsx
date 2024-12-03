import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"
import { ChatHeader } from "./ChatHeader"
import { MessageSkeleton } from "./Skeleton/MessageSkeleton"
import { MessageInput } from "./MessageInput"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"

export const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore()
  const {authUser} = useAuthStore()
  
  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id,getMessages])

  if(isMessagesLoading){
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
    )
  }
    
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            // ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="border rounded-full size-10">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="mb-1 chat-header">
              <time className="ml-1 text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}
