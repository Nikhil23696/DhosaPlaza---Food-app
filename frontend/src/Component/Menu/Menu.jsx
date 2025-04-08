import React from 'react'
import './Menu.css'
import DishCard from '../Dish/DishCard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = () => {
    const {allmenu} = useSelector((store)=> store.menu);
  return (
    <>
    <div className="menu"> 
        <div className="menu1">
        <Link to={`/menu/${allmenu?._id}`} className='link'>
                <div className="dishcard">
                    <img src={allmenu?.images?.url} loading='lazy' />
                    <h3>{allmenu?.name}</h3>
                    <p>{allmenu?.description}</p>

                    <p className='bold'>₹
                        {allmenu?.price}</p>
                </div>
            </Link>
        </div>
        <div className="filter">
            <h2>Select by Dishes</h2>
            <div className="category">
                <input type="checkbox" />
                <p>Masala Dhosa</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Idli Sambhar</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Sandwich</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Pizza</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Burger</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Fried Rice</p>
            </div>
            <div className="category">
                <input type="checkbox" />
                <p>Chawmin</p>
            </div>
        </div>
        <div className="filter1">
            <div className="category1">
                <input type="checkbox" />
                <p>Rs 100 - 250</p>
            </div>
            <div className="category1">
                <input type="checkbox" />
                <p>Rs 250 - 500</p>
            </div>
            <div className="category1">
                <input type="checkbox" />
                <p>Rs 500 - 750</p>
            </div>
            <div className="category1">
                <input type="checkbox" />
                <p>Rs 750 - 1000</p>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Menu