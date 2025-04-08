import { Avatar, Typography } from '@mui/material'
import React from 'react'
import './Profile.css'

const Profile = () => {
    return (
        <>
            <div className="myprofile">
                <div className="left">
                    <Typography fontWeight={'bold'} fontSize={'2vmax'}>My Profile</Typography>
                    <Avatar sx={{ width: '20vmax', height: '30vh' }} variant='square' className='myavatar' />
                    <button className='mybtn'>Edit Profile</button>

                </div>
                <div className="right">
                    <div className="name">

                        <Typography fontWeight={'bold'}>Full Name</Typography>
                        <p>Nikhil</p>
                    </div>
                    <div className="email">

                        <Typography fontWeight={'bold'}>Email</Typography>
                        <p>nikhil@gmail.com</p>
                    </div>
                    <div className="date">

                        <Typography fontWeight={'bold'}>Joined On</Typography>
                        <p>01-02-2025</p>
                    </div>
                    <div className="button">
                        <button className='mybtn'>Change Password</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile