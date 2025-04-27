import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"


const useGetMyOrderDetails = (id)=>{
    const dispatch = useDispatch();
     useEffect(()=>{
        const fetchOrderDetails = async()=>{
            try {
                const res = await axios.get(`http://loalhost:8000/api/v1/order/${id}`);
                dispatch(res.data.order)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrderDetails()
     },[dispatch, id])
}
export default useGetMyOrderDetails