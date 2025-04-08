import { Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Admin.css'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">

                <Link to={'/admin/dashboard'} className='link'>
                    <h3 className='text'>Dashboard</h3>
                </Link>
                <Link to={'/admin/menu/all'} className='link'>
                    <h3 className='text'>All Food Menu</h3>
                </Link>
                <Link to={'/admin/menu/new'} className='link'>
                    <h3 className='text'>Create New Menu</h3>
                </Link>
                <Link to={'/admin/orders/all'} className='link'>
                    <h3 className='text'>All Orders</h3>
                </Link>
            </div>
            <Outlet />
        </>
    )
}

export default Sidebar