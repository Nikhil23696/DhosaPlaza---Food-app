import React, { useState } from 'react'
import './Home.css'
import axios from 'axios';

const Banner = () => {
    const [search, setSearch] = useState("");
    
    const handleSearch = async()=>{
        try {
           
            const res = await axios.get(`https://dhosaplaza.onrender.com/api/v1/menu/all?search=${search}`, {withCredentials: true})
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="banner">
                <h1>Order Your favourite food here...</h1>
                <h3>choose from our diverse food menu and <br /> delicious categories</h3>
                <div className="inputfield">
                    <input 
                    type="search" 
                    placeholder='Search for Food item...'
                    value={search} 
                    onChange={(e)=> setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch()
                    }}
                    />
                    <button onClick={handleSearch} >Search</button>
                </div>
            </div>
        </>
    )
}

export default Banner