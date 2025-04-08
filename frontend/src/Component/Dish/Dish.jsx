import React from 'react'
import './Dish.css'
import DishCard from './DishCard'
import { useSelector } from 'react-redux'
import useGetAllMenu from '../../hooks/useGetAllMenu'

const Dish = () => {
  const {allmenu} = useSelector((store)=> store.menu);
  useGetAllMenu()
  return (
    <>
    <div className="dish">
      {
         allmenu && allmenu.map((menu)=>{
          return  <DishCard menu={menu}/>
         })
      }
    </div>
    </>
  )
}

export default Dish