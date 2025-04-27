import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openUserMenu } from '../../redux/serviceSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserMenu = () => {
    const dispatch = useDispatch();
    const {userMenu} = useSelector((store)=> store.service);
    const {authUser} = useSelector((store)=> store.user)
    const navigate = useNavigate();

    const handleClose = ()=>{
       dispatch(openUserMenu(null))
    }
    const handleLogout = async()=>{
        console.log("hi")
        const res = await axios.get('http://loalhost:8000/api/v1/user/logout', {
            withCredentials: true
        })
        console.log(res.data.message)
        if(res.data.success){
            navigate('/login')
            toast.success(res.data.message)
        }
    }
    return (
        <>
            <Menu
                anchorEl={userMenu}
                open={userMenu !== null ? true:false}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Link to={'/profile'} className='link'><MenuItem>Account</MenuItem></Link>
              <Link to={'/orders/me'} className='link'><MenuItem>My Orders</MenuItem></Link> 
              {
                authUser?.role === "admin" && <Link to={'/admin/dashboard'} className='link'><MenuItem>Admin</MenuItem></Link>
              }
              
               
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu