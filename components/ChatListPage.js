import React from 'react'
import Chat from './chat'
const ChatListPage = ({chatSnapShot}) => {
    return (
        <div>
              {chatSnapShot?.docs.map(chat=>(
            <Chat  key={chat.id} id={chat.id} users={chat.data().users}/>
        ))}
        </div>
    )
}

export default ChatListPage
