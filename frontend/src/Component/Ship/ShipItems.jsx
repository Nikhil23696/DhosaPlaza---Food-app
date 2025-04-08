import React, { useState } from 'react'
import './Ship.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { getMyShippingDetails } from '../../redux/menuSlice';

const ShipItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [pinCode, setPinCode] = useState();
    const [phoneNo, setPhoneNo] = useState();

    const shippingDetails = (e)=>{
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length > 10){
            toast.error('PhoneNo should be 10 digits');
            return
        }
        dispatch(getMyShippingDetails({
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo
        }));
        navigate('/order/confirm')
    }
    return (
        <> 
            <div className="ship">
                <h1>Shipping Details</h1>
                <form
                onSubmit={shippingDetails}
                >
                    <div className="ship1">
                        <input
                            type="text"
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='City'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='Pin Code'
                            required
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='Phone'
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            size={10}
                        />
                        <input
                            type="text"
                            placeholder='Country'
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            size={10}
                        />
                        <input
                            type="text"
                            placeholder='State'
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            size={10}
                        />
                       
                        <button type='submit' className='btn'>Continue</button>
                       
                    </div>
                </form>
            </div>
        </>
    )
}

export default ShipItems