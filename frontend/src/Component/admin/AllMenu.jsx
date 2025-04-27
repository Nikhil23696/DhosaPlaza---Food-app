import React from 'react'
import './AllMenu.css'
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { removeMenu } from '../../redux/menuSlice.js'

const AllMenu = () => {
  const {allmenu} = useSelector((store)=> store.menu);
  const dispatch = useDispatch()

  const handleDeleteMenu = async(id)=>{
   try {
        const res = await axios.delete(`https://dhosaplaza.onrender.com/api/v1/menu/delete/${id}`,{withCredentials:true})
        console.log(res.data)
          dispatch(removeMenu(id))
          toast(res.data.message)
   } catch (error) {
    toast.error(error?.response?.data?.message)
   }
  }
  return (
    <>
    <div className="allmenu">
      <div className="allmenu0">

      <div className="allmenu1">
        <b>Food ID</b>
        <b>Name</b>
        <b>Stock</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {
        allmenu && allmenu.map((food)=>(
      <div className="allmenu2" key={food._id}>
        <p>{food._id}</p>
        <p>{food?.name}</p>
        <p>{food?.stock}</p>
        <p>{food?.price}</p>
        <div className="allmenu3">
          <MdEdit className='svg'/>
          <MdOutlineDelete className='svg' onClick={()=> handleDeleteMenu(food._id)}/>
        </div>
      </div>

        ))
      }
      </div>
    </div>
    </>
  )
}

export default AllMenu