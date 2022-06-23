import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ChatPage = () => {
  const [chats,setChats]=useState(['']);
    const fetchChats = async()=>{
        const {data} = await axios.get('/api/chat');
        setChats(data);
    };
    useEffect(()=>{
       fetchChats();
    },[])
  return (
    
    
     <div>
      {
      chats.map((chat)=>(
     <div key="{chat._id}"> {chat.chatName}</div>))
      }
        hello
        
    </div>
  )
}

export default ChatPage