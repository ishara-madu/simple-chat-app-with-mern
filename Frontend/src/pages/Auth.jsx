import React, { useState } from 'react'
import './Auth.css'
import Cookies from 'js-cookie';

export default function Auth() {
  const [username, setUsername] = useState('')


  const handleSubmit = () => {
    Cookies.set('username', username, { expires: 7 })
    window.location.href = '/'
  }

  return (
    <div className='wrapper-auth'>
      <form  onSubmit={(e) => { e.preventDefault(); }} className='container'>
        <h1>Join for Chat</h1>
        <input type="text" onChange={(e) => { setUsername(e.target.value) }} name="" id="" className='username' value={username} />
        <input type="submit" className='submit' value={"Submit"} onClick={() => { handleSubmit() }} />
      </form>
    </div>
  )
}
