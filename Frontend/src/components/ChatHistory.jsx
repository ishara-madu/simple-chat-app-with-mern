import React, { useEffect, useRef } from 'react'
import { format } from 'date-fns';
import Cookies from 'js-cookie';

export default function ChatHistory({ messagesHistory }) {

    const messagesEndRef = useRef(null)

    const getFormattedTime = (createdAt) => {
        return format(new Date(createdAt), 'dd MMM yyyy HH:mm');
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior:'smooth' });
    }, [messagesHistory])
    return (
        <>
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
        </>
    )
}
