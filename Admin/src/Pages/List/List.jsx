import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = ({url}) => {
  //url for fetching the data(url of our server as we have destructure ite here and define in the App'jsx)
  
  
  //storing all the data from database into one state variable
  const [list,setList] =useState([]);
  
  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`)
    
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

   //function to remove the item from the list and here we are are doing the api call to remove 
   //the item from database,its endpoint we have created in bakend folder
   const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    
    //As after deleting we have to show the data that is remain after deleting 
    //hence we are excuting it after deleting again 
    await fetchList();

    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
   }

  useEffect(()=>{
    fetchList();
  },[])
  
  
  
  
  return (
    <div className='list add flex-col'>
       <p>All Food List </p>
       <div className='list-table'>
        <div className='list-table-format tittle'>
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image}></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>{removeFood(item._id)}}  className='cursor'>x</p>
            </div>
           
          )
        })}
       </div>
  
    </div>
  )
}

export default List