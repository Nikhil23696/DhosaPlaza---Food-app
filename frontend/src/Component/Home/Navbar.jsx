import React from 'react'
import './Navbar.css'
import { Avatar, Typography } from '@mui/material'
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import UserMenu from '../Models/userMenu';
import { useDispatch, useSelector } from 'react-redux';
import { openUserMenu } from '../../redux/serviceSlice';
import Badge from '../Badge/Badge';

const Navbar = () => {
    const dispatch = useDispatch();
    const {authUser} = useSelector((store)=> store.user)

    const openMenu =()=>{
        dispatch(openUserMenu(true))
    }
    return (
        <>
            <div className="nav">
                <div className="nav1">
                    <h1><span className='sp1'>Dhosa</span><span className='sp2'>Plaza</span></h1>
                    <div className="nav2">
                       <Link to={'/'} className='link'><Typography className='ty'>Home</Typography></Link>
                        <Link to={'/menu'} className='link'><Typography className='ty'>Menu</Typography></Link>
                        <Typography className='ty1'>Contact Us</Typography>
                    </div>
                    <div className="nav3">
                       <Link to={'/cart'} className='link'><IoCartOutline size={'3vmax'} cursor={'pointer'} className='ty'/></Link>
                       <Badge/>
                        <Avatar onClick={openMenu} 
                        src={authUser?.avatar?.url}
                        />
                        <UserMenu/>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Navbar