import React from 'react'
import logoutImage from '../assets/logout.svg'
import Cookies from 'js-cookie';

export default function Logout() {

    const handleLogout = ()=>{
        if(!confirm()) return "Are you sure you want to logout?";
        try {
            Cookies.remove('username');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div onClick={()=>{handleLogout()}}><img src={logoutImage} alt="" /></div>
    )
}
