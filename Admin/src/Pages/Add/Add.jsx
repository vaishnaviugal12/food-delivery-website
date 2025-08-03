import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
//as we using the url in all three pages hence we have defined it as prop in app.jsx and destructure it here

const [image,setImage] = useState(false);

//handling the data of the form
const[data,setData]= useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"

 })
 
 //onchangehandeler function
 const onChangeHandler=(event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
 }

 const onSubmitHandler = async (event)=>{
    //as our form get reloaded after sumiting it so to handle this we have use this function on our event
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    
    //creating the api to send the data to the bakend folder
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
         name:"",
    description:"",
    price:"",
    category:"Salad"

      })
      setImage(false);
      //use for notification when our data get added to the db
      toast.success(response.data.message);
    }
    else{
       toast.error(response.data.message)
    }
 }

        return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        {/*Image for uploading , the e is event, important*/}
                        <img src={image?URL.createObjectURL(image):assets.upload_area}></img>
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])}type='file' id='image' hidden required></input>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here'></input>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler}  name='category'>
                            <option value="Salad">salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>

                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20'></input>
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add