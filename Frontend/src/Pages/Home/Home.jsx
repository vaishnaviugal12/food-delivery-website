import React, { useState } from 'react'
import './Home.css';
import Header from '../../Components/Header/Header';
import Exploremenu from '../../Components/ExploreMenu/Exploremenu';
import Fooddisplay from '../../Components/Fooddisplay/Fooddisplay';
import AppDownload from '../../Components/AppDownload/AppDownload';

const Home = () => {
     const [category, setCategory]=useState("All")
    return (
    <div>
        <Header/>
        <Exploremenu category={category} setCategory={setCategory}/>
        <Fooddisplay  category={category}/>
        <AppDownload></AppDownload>
    </div>
  )
}

export default Home