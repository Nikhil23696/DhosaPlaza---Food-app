import { useEffect } from "react";
import { useDispatch } from "react-redux"
import axios from 'axios'
import { getAllMenu } from '../redux/menuSlice.js'

const useGetAllMenu = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchMenu = async()=>{
            try {
                axios.defaults.withCredentials = true
                const res = await axios.get('https://dhosaplaza.onrender.com/api/v1/menu/all')
                dispatch(getAllMenu(res.data.menu))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMenu()
    },[dispatch])
}
export default useGetAllMenu