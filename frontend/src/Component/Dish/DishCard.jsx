import React from 'react'
import './Dish.css'
import { Link } from 'react-router-dom'

const DishCard = ({ menu }) => {
    return (
        <>
            <Link to={`/menu/${menu._id}`} className='link'>
                <div className="dishcard">
                    <img src={menu?.images[0]?.url} loading='lazy' />
                    <h3>{menu?.name}</h3>
                    <p>{menu?.description}</p>

                    <p className='bold'>₹
                        {menu?.price}</p>
                </div>
            </Link>
        </>
    )
}

export default DishCard