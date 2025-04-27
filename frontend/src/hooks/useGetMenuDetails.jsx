import { useEffect } from "react";
import axios from 'axios'
import { getMenuDetails } from '../redux/menuSlice.js'
import { useDispatch } from 'react-redux'

const useGetMenuDetails = (id)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMenuDetails = async()=>{
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get(`https://dhosaplaza.onrender.com/api/v1/menu/${id}`)
                dispatch(getMenuDetails(res.data.menu))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMenuDetails()
    },[dispatch, id])
}
export default useGetMenuDetails