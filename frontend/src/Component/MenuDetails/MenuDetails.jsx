import React, { useState } from 'react'
import './Menudetails.css'
import { Avatar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import useGetMenuDetails from '../../hooks/useGetMenuDetails'
import { useDispatch, useSelector } from 'react-redux'
import { addMenuToCart } from '../../redux/menuSlice.js'
import { toast } from 'react-toastify'

const MenuDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    useGetMenuDetails(id);
    const { menuDetails } = useSelector((store) => store.menu);

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = ()=>{
        if(quantity > 1){
            const qty = quantity -1;
            setQuantity(qty)
        }
    }
    const increaseQuantity = ()=>{
        if(menuDetails.stock <= quantity) return
        const qty = quantity +1;
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        const cartItem = {
            _id: menuDetails?._id,
            name: menuDetails?.name,
            price: menuDetails?.price,
            image: menuDetails?.images?.[0]?.url,
            stock: menuDetails?.stock,
            quantity: quantity,
            
        }
        dispatch(addMenuToCart(cartItem));
        console.log(addMenuToCart(cartItem))
        const menuCart = localStorage.getItem("menuCart") ? JSON.parse(localStorage.getItem("menuCart")) : [];
        toast.success('Product added To Cart');

        const updatedCart = [...menuCart, cartItem];
        localStorage.setItem("menuCart", JSON.stringify(updatedCart))
    }
    return (
        <>
            <div className="menudetail">
                <div className="detail1">
                    <img src={menuDetails?.images[0]?.url} loading='lazy' />
                    <div className="detail2">
                        <p># {menuDetails?._id}</p>
                        <h1>{menuDetails?.name}</h1>
                        <div className="btag">
                            <b>Price: <span className='sp'>₹
                                {menuDetails?.price}</span></b>
                            <b>Quantity:
                                <button className='btn' onClick={decreaseQuantity}>-</button>

                                <input type="number" readOnly value={quantity}/>

                                <button className='btn' onClick={increaseQuantity}>+</button>
                            </b>
                            <div className="descc">
                                <b>Ratings:</b>
                                <p>{menuDetails?.ratings}</p>
                            </div>
                        </div>
                        <div className="descc">
                            <b>Description:</b>
                            <p>{menuDetails?.description}</p>
                        </div>
                        <div className="button">
                            <button className='btn'>Order Now</button>
                            <Link className='link'><button className='btn' onClick={addToCartHandler}>Add TO CART</button></Link>
                        </div>
                    </div>
                </div>
                <h2 className='hh'>Reviews</h2>
                <button className='btn1'>Submit Review</button>
                <div className="review">
                    <Avatar loading='lazy' />
                    <div className="user">
                        <b>Nikhil</b>
                        <Typography>Awesome Masala Dhosa, Worth it</Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuDetails