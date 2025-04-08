import React from 'react'
import { RiShareBoxLine } from "react-icons/ri";
import './MyOrders.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { order } = useSelector((store) => store.order)
    
    return (
        <>
            <div className="me">
                <div className="me1">
                    <b>Order ID</b>
                    <b>Status</b>
                    <b>Quantity</b>
                    <b>Amount</b>
                    <b>Action</b>
                </div>
                {
                    order && order.map((orderMe) => (
                        <div className="me2" key={orderMe._id}>
                            <p>{orderMe?._id}</p>
                            <p>{orderMe?.orderStatus}</p>
                            <p>{orderMe?.orderItems.length}</p>
                            <p>{orderMe?.totalPrice}</p>
                            <Link className='link' to={`/orders/${orderMe?._id}`}>
                            <RiShareBoxLine className='box' />
                            </Link>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default MyOrders