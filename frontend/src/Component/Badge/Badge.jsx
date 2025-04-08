import React from 'react'
import './Badge.css'
import { useSelector } from 'react-redux'

const Badge = () => {
  const { cart } = useSelector((store) => store.menu)
  return (
    <>
    <p className='badge'>{cart.length}</p>
    </>
  )
}

export default Badge