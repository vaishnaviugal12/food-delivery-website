import React, { useContext } from 'react'

import './Fooddisplay.css'
import { StoreContext } from '../../Context/Storecontext'
import FoodItem from '../FoodItem/FoodItem'

const Fooddisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)

      
  return (
    <div className='fooddisplay' id='fooddisplay'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
         

            {food_list.map((item)=>{
                if(category==="All" || category===item.category){
                   return <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>  
                }
                

            })}

        </div>
    </div>
  )
}

export default Fooddisplay