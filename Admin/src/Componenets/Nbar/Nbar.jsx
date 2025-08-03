import React from 'react'
import './Nbar.css'
import {assets} from '../../assets/assets';
 const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");

    }
const Nbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo}></img>
        <img  className='profile' src={assets.profile_image}></img>
    </div>
  )
}

export default Nbar
