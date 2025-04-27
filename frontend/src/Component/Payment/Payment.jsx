import React, { useRef } from 'react'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import './Payment.css'
import { FaRegCreditCard } from "react-icons/fa";
import { MdEventNote, MdOutlineVpnKey } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../redux/orderSlice.js';
import { Typography } from '@mui/material'

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shipMenu, cart } = useSelector((store) => store.menu);
    const { authUser } = useSelector((store) => store.user)

    const totalPrice = cart?.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        return total + price * quantity;
    }, 0);

    const shippingPrice = totalPrice > 200 ? 50 : 0
    const paymentData = { amount: Math.round((totalPrice + shippingPrice) * 1.2) };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true

        try {

            const res = await axios.post('http:///api/v1/order/payment/process', paymentData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })

            const client_secret = res.data.client_secret;
            if (!stripe || !elements)
                return <h1>Loading Payment Gateway...</h1>;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: authUser?.name,
                        email: authUser?.email,
                        address: {
                            line1: shipMenu?.address,
                            city: shipMenu?.city,
                            state: shipMenu?.state,
                            country: shipMenu?.country,
                            postal_code: shipMenu?.pinCode
                        }
                    }
                }
            })
            if (result.error) {
                payBtn.current.disabled = false;
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    const order = {
                        shippingInfo: shipMenu,
                        orderItems: cart.map(item => ({
                            menu: item._id,
                            quantity: item.quantity,
                            name:item.name,
                            price:item.price
                        })),
                        user: authUser?._id,
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        },
                        paidAt: Date.now(),
                        shippingPrice,
                        totalPrice
                    };
                    try {
                    const orderRes = await axios.post('http://loalhost:8000/api/v1/order/new', order, {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true
                        })
                        dispatch(createOrder(orderRes.data.order))
                    } catch (error) {
                        toast.error(error?.response?.data?.message)
                    }
                    navigate('/success')
                } else {
                    toast.error("There's some issue while processing payment ")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <>
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <FaRegCreditCard />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <MdEventNote />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <MdOutlineVpnKey />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${paymentData.amount}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default Payment