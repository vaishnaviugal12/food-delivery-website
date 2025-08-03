import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/Storecontext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("Menu");
   
    {/*functionality for dot on on cart icon when cart empty dont show the dot so we are acessing the cart items */}
    const{getTotalcartAmount,token,setToken}=useContext(StoreContext);

// As when user logout it will navigate to the home page for this we have used react navigate  hook
   const navigate = useNavigate();

    const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");

    }


    return (
        <div className='navbar'>
            <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>Contact-us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    {/*functionality for dot on on cart icon when cart empty dont show the dot */}
                    <div className={getTotalcartAmount()===0?"":"dot"}></div>
                </div>
                {/*as show the sign in when user not signed in otherwise show the following,if token present means user has creted acount only when token not present then sign in */}
               {!token?<button onClick={() => setShowLogin(true)}>SignIn</button>
                 :<div className='navbar-profile'>
                    <img src={assets.profile_icon}></img>
                    <ul className='nav-profile-dropdown'>
                         <Link to='/myorders'>
                          <li><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
                         </Link>
                        <hr></hr>
                        <li onClick={logout}> <img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                       
                    </ul>
                </div>
               }
            </div>
            
        </div>
    )
}

export default Navbar


