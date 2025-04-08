import React from 'react'
import './OrderConfirm.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Orderconfirm = () => {
  const { shipMenu, cart } = useSelector((store) => store.menu)
  const totalPrice = cart?.reduce((total, item) => {
    const price = Number(item.price) || 0;  
    const quantity = Number(item.quantity) || 1;  
    return total + price * quantity;
}, 0);

  const shippingPrice = totalPrice > 200 ? 50 : 0
  return (
    <>
      <div className="orderconfirm">
        <div className="leftorderconfirm">
          <div className="shippinginfo">
            <h2>Shipping Info</h2>
            <div className="shippingdetails">
              <div className="detailsofdetails">
                <Typography>Name</Typography>
                <p className='myshippingdetails'>Nikhil Yadav</p>
              </div>
              <div className="detailsofdetails">
                <Typography>Phone</Typography>
                <p className='myshippingdetails'>{shipMenu?.phoneNo}</p>
              </div>
              <div className="detailsofdetails">
                <Typography>Address</Typography>
                <p className='myshippingdetails'>{shipMenu?.address}</p>
              </div>
            </div>
          </div>
          <div className="yourcartitems">
            <h2>Your Cart Items</h2>
            <div className="your1">
              {
                cart && cart.map((myCart)=>(
              <div className="yourimg" key={myCart._id}>
                <img src={myCart?.image} alt="ssa" />
                <p>{myCart?.name}</p>
              </div>

                ))
              }
              <p>₹ {totalPrice}</p>
            </div>
          </div>
        </div> 
        <div className="rightorderconfirm">
          <h2>Order Summary</h2>
          <div className="totalorder">
            <div className="totalorder1">
              <Typography>Subtotal :</Typography>
              <p className='myshippingdetails'>₹              {totalPrice}</p>
            </div>
            <div className="totalorder1">
              <Typography>Shipping Charges :</Typography>
              <p className='myshippingdetails'>₹
              {shippingPrice}</p>
            </div>
          </div>
          <div className="totalamount"> 
            <b>Total</b>
            <Typography>{totalPrice + shippingPrice}</Typography>
          </div>
          <Link to={'/process/payment'}>
          <button className='mybtn' type='submit'>Proceed To Payment</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Orderconfirm