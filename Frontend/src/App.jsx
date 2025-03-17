import React, { useEffect, useState } from 'react'
import Auth from './pages/Auth'
import './App.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { io } from 'socket.io-client';
import InputMessage from './components/InputMessage';
import ChatHistory from './components/ChatHistory';
export default function App() {

  const [messagesHistory, setMessagesHistory] = useState([])

  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'], // Ensure both transports are allowed
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/messages').then((res) => setMessagesHistory(res.data));
    socket.on('message', (newMessage) => {
      setMessagesHistory((prev) => [...prev, newMessage]);
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err);
    });

    return () => {
      socket.off('message');
      socket.off('connect_error');
    };
  }, [])






  return (
    <div className='wrapper'>
      <div className="top-bar">
        <h1>Random Chat</h1>
        <p>Hello,{Cookies.get('username')}</p>
      </div>
      <ChatHistory messagesHistory={messagesHistory}/>
      <InputMessage />
    </div>
  )
}
