import { Typography } from '@mui/material'
import React from 'react'
import './OrderDetails.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useGetMyOrderDetails from '../../hooks/useGetMyOrderDetails'

const OrderDetails = () => {
    const {id} = useParams();
    useGetMyOrderDetails(id)
    const {  orderDetails } = useSelector((store) => store.order);
    const {authUser} = useSelector((store)=> store.user)
    return (
        <>
                <Typography variant='h5' color='tomato' textAlign={'center'}>Order #67739762a7572453a834fb97</Typography>
            <div className="orderdetails">
                <div className="orderdetails2">
                    <h2>Shipping Info</h2>
                    <div className="shippingdetails">
                        <div className="detailsofdetails">
                            <b>Name :</b>
                            <p className='myshippingdetails'>{authUser?.name}</p>
                        </div>
                        <div className="detailsofdetails">
                            <b>Phone :</b>
                            <p className='myshippingdetails'>1234567890</p>
                        </div>
                        <div className="detailsofdetails">
                            <b>Address :</b>
                            <p className='myshippingdetails'>Gorakhpur, UP</p>
                        </div>
                    </div>
                    <div className="orderpayment">
                        <h2>Paid</h2>
                        <div className="twofour">

                            <b>Amount</b>
                            <p className='myshippingdetails'>2400</p>
                        </div>
                    </div>
                    <div className="status">
                        <h2>Order Status</h2>
                        <Typography marginBottom={'1vmax'}>Processing</Typography>
                    </div>
                </div>
                <div className="orderitems">
                    <h2>Order Items</h2>
                    <div className="your1">
                        <div className="yourimg">
                            <img src='https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/o/c/2/m-rckd01234-n6-raymond-original-imah4kyyh7ejjw8a.jpeg?q=70' alt="ssa" className='orderimg' />
                            <p>item2</p>
                        </div>
                        <p>3 X 1200 = 3600 Rs</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetails