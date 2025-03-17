import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import sendImage from '../assets/send.png'

export default function InputMessage() {
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        await axios.post('http://localhost:5000/api/messages', { username: Cookies.get('username'), message: message }).then(
            () => {
                setMessage('')
            }
        )
    }

    return (
        <>
            <form className="message-area" onSubmit={(e) => { e.preventDefault(); }}>
                <div className='message-input-wrapper'>
                    <input onChange={(e) => { setMessage(e.target.value) }} type="text" className='message-input' placeholder='Enter your message here' value={message} />
                </div>
                <button type='submit' onClick={() => { handleSendMessage() }} className='send-btn'><img src={sendImage} alt="" /></button>
            </form>
        </>
    )
}
