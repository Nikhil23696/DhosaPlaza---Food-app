import { Typography } from '@mui/material';
import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import './OrderSuccess.css'
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <>
            <div className="success">
                <FaCheckCircle size={'10vw'} color='tomato' />
                <Typography fontWeight={'bold'} fontSize={'2vmax'}>Your Order has been Placed Successfully</Typography>
                <Link className='link' to={'/orders/me'}>
                    <p className='view'>View Orders</p>
                </Link>
            </div>
        </>
    )
}

export default OrderSuccess