import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) =>{
    const {authUser} = useSelector(store => store.user)

    const navigate = useNavigate();
   useEffect(()=> {
    if(authUser === null || authUser.role !== 'admin'){
        navigate('/');
    }
   },[]);

   return (
    <>
    {children}
    </>
   )
}
export default ProtectedRoute