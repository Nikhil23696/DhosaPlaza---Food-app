import { useEffect } from "react";
import { useDispatch } from "react-redux"
import axios from 'axios'
import { getAdminOrders } from "../redux/orderSlice";

const useGetAllMenu = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMenu = async()=>{
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get('http://loalhost:8000/api/v1/order/all')
                dispatch(getAdminOrders(res.data.orders))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMenu()
    },[dispatch])
}
export default useGetAllMenu