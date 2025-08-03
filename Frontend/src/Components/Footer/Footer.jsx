import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
        <div className="footer-content-left">
        <img src={assets.logo}></img>
        <p>We deliver in under 30 minutes in select locations </p>
        <div className="footer-social-icon">
            <img src={assets.facebook_icon}></img>
            <img src={assets.twitter_icon}></img>
            <img src={assets.linkedin_icon}></img>
        </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>delivery</li>
                <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 2345678799</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer