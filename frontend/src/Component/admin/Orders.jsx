import React from 'react'
import './AllMenu.css'
import useGetAllOrder from '../../hooks/useGetAllOrder'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import axios from 'axios';
import { removeOrder } from '../../redux/orderSlice';

const Orders = () => {
  const dispatch = useDispatch()
  useGetAllOrder()
  const { adminOrders } = useSelector((store) => store.order);

  const handleDeleteOrder = async(id) =>{
    try {
      const res = await axios.delete(`https://dhosaplaza.onrender.com/api/v1/order/delete/${id}`)
       dispatch(removeOrder(id))
      console.log(res.data)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <>
      <div className="allmenu">
        <div className="allmenu1">
          <b>Order ID</b>
          <b>Status</b>
          <b>Item Qty</b>
          <b>Amount</b>
          <b>Action</b>
        </div>
        {
          adminOrders && adminOrders.map((admin)=>(
        <div className="allmenu2" key={admin._id}>
          <p>{admin?._id}</p>
          <p>{admin?.orderStatus}</p>
          <p>{admin?.orderItems.length}</p>
          <p>{admin?.totalPrice}</p>
          <MdDeleteOutline className='deletemd' onClick={()=> handleDeleteOrder(admin._id)}/>
        </div>

          ))
        }
      </div>
    </>
  )
}

export default Orders