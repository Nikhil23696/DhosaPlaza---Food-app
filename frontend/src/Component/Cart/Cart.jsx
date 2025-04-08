import React from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { removeMenuFromCart } from '../../redux/menuSlice.js';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store.menu)

    const handlebtn = () => {
        navigate('/shiping/details')
    }
    const totalPrice = cart?.reduce((total, item) => {
        const price = Number(item.price) || 0;  
        const quantity = Number(item.quantity) || 1;  
        return total + price * quantity;
    }, 0);
    const handleDelete = (id)=>{
        dispatch(removeMenuFromCart(id))
    }
    return (
        <>
            <div className="cart">
                <div className="cart1">
                    <b>Menu</b>
                    <b>Quantity</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                <div className="cartmain">
                    {
                        cart && cart.map((myCart) => (

                            <div className="cart2">
                                <div className="cart3" key={myCart._id}>
                                    <img src={myCart.image} loading='lazy' className='cartimg' />
                                    <p>{myCart?.name}</p>
                                </div>
                                <p className='quant'>{myCart?.quantity}</p>
                                <p>₹
                                {myCart?.price}</p>
                                <MdDelete 
                                cursor={'pointer'}
                                onClick={()=> handleDelete(myCart._id)}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="total">
                    <b>Toatal Price</b>
                    <p>₹ {totalPrice} </p>
                </div>
                <button className='cartbtn' onClick={handlebtn}>Continue</button>
            </div>
        </>
    )
}

export default Cart