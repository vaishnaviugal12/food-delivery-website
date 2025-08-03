import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart.jsx'
import Placeorder from './Pages/Placeorder/Placeorder.jsx'
import Footer from './Components/Footer/Footer.jsx'
import LoginPopup from './Components/LoginPopup/LoginPopup.jsx'
import Verify from './Pages/Verify/Verify.jsx'
import Myorders from './Pages/Myorders/Myorders.jsx'



const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  
  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<Myorders/>}></Route>
        </Routes>

      </div>
      <Footer />
     
    </>
     


  )
}

export default App