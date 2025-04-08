import React from 'react'
import Banner from './Banner'
import Dish from '../Dish/Dish'

const Home = () => {
  return (
    <>
      <div className="home">
        <Banner />
        <h2>Top dishes near you</h2>
        <Dish />
      </div>
    </>
  ) 
}

export default Home