import React, { useEffect, useRef, useState } from 'react'
import Auth from './pages/Auth'
import './App.css'
import sendImage from './assets/send.png'
import Cookies from 'js-cookie';
import axios from 'axios';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
export default function App() {

  const [message, setMessage] = useState('')
  const [messagesHistory, setMessagesHistory] = useState([])
  const messagesEndRef = useRef(null)

  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'], // Ensure both transports are allowed
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/messages').then((res) => setMessagesHistory(res.data)).then(() => scrollToBottom());
    socket.on('message', (newMessage) => {
      setMessagesHistory((prev) => [...prev, newMessage]);
      scrollToBottom();
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err);
    });

    // Cleanup
    return () => {
      socket.off('message');
      socket.off('connect_error');
    };
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  const handleSendMessage = async () => {
    await axios.post('http://localhost:5000/api/messages', { username: Cookies.get('username'), message: message }).then(
      () => {
        setMessage('')
        scrollToBottom()
      }
    )
  }

  const getFormattedTime = (createdAt) => {
    return format(new Date(createdAt), 'dd MMM yyyy HH:mm');
  };
  
  return (
    <div className='wrapper'>
      <div className="top-bar">
        <h1>Random Chat</h1>
        <p>Hello,{Cookies.get('username')}</p>
      </div>
      <div className="hero-section">
        {
          messagesHistory.map((msg, index) => (
            <div key={index} className={`chat-container ${msg.username === Cookies.get('username') ? 'mine' : 'other'}`}>
              <div className='chat-top'>
                <p className='chat-username'>{msg.username}</p>
                <p className='chat-timestamp'>{getFormattedTime(msg.createdAt)}</p>
              </div>
              <p className='chat-message'>{msg.message}</p>
            </div>
          ))
        }
        <div ref={messagesEndRef} className="bottom-chat-container"></div>
      </div>
      <form className="message-area" onSubmit={(e) => { e.preventDefault(); }}>
        <div className='message-input-wrapper'>
          <input onChange={(e) => { setMessage(e.target.value) }} type="text" className='message-input' placeholder='Enter your message here' value={message} />
        </div>
        <button type='submit' onClick={() => { handleSendMessage() }} className='send-btn'><img src={sendImage} alt="" /></button>
      </form>
    </div>
  )
}
