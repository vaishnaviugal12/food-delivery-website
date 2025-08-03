import React from 'react'
import './Orders.css'
import { useState } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import { useEffect } from 'react';
import { assets } from '../../assets/assets';



const Orders = ({ url }) => {
  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try{
const response = await axios.get(url + "/api/order/listorders");

    if (response.data.success){
    setOrders(response.data.data);
   
  }
  else{
    toast.error("Error");
   
  }
}
    
  catch(error){
console.log(error);

    }
  };

  //function for updating the order status
const statusHandler = async (event, orderId)=>{
/*******************/ 
const response = await axios.post(url+"/api/order/status", {orderId, status:event.target.value});
if(response){
  await fetchAllOrders();
}
}



useEffect(()=>{
  fetchAllOrders();
},[])


return (
  <div className='order add'>
    <h3>Order Page</h3>
    <div className='order-list'>
      {Orders.map((order, index) => {
        return (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  
                if(index===order.items.length-1){
                    return (item.name+" x "+ item.quantity)
                  }
                    else{
                    return (item.name + " X "+item.quantity+", ")
                  }
                })}
              </p>
              <p className='order-item-name'>{order.adress.firstName+" "+order.adress.lastName}</p>
               <div className="order-item-name">
                <p >{order.adress.street+","}</p>
                <p> {order.adress.city+", "+order.adress.state+", "+order.adress.country+", "+order.adress.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.adress.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food processing">Food processing</option>
              <option value="out for delivery">Out For delivery</option>
              <option value="Deliverd">Delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  </div>
)
}


export default Orders;