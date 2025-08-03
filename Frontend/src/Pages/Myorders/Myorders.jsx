import React from 'react'
import './Myorders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../Context/Storecontext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
const Myorders = () => {
  
  const{url,token} = useContext(StoreContext);

  const[data,setData] = useState([]);
  
  const fetchorders = async ()=>{
  /********************* */
  //api for fetching the users orders data from frontend to bakend
  const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}} );
  console.log(response);
  setData(response.data.data);
  console.log(response.data.data)
  }
//on every load fetch the users orderdata
  useEffect(()=>{
   if(token){
    fetchorders();
   }
  },[token]);
  
  return (
    <div className='my-orders'>
      <h2>My orders</h2>
      <div className='container'>
        {data.map((order,index)=>{
          return(
            <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon}></img>
            <p>{order.items.map((item,index)=>{
              if(index===order.items.length-1){
                return item.name +" X "+item.quantity;
              }
              else{
                return item.name+" X "+item.quantity+", "
              }
            })}</p>
            <p> ₹{order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
           <button onClick={fetchorders}>Track Order</button>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Myorders;


