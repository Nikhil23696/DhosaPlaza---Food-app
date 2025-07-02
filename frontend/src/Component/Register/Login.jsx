import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../../redux/userSlice'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useSelector(store => store.user);
    const dispatch = useDispatch()
    const [input,setInput] = useState({
        email: "",
        password: "",
        role: "user",
    })

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
           console.log("hi")
            const res = await axios.post('https://dhosaplaza.onrender.com/api/v1/user/login', input,{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log("hi2")
            if (res.data.success) {
               dispatch(setAuthUser(res.data.user))
                toast.success(res.data.message)
                setInput({
                    email:"",
                    password:"",
                    role:"user"
                })
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally{
            setLoading(false)
        }
        
    }
    useEffect(() => {
        if (authUser) {
            navigate("/")
        }
    }, [])
    return (
        <>
            <div className="signup">
                <form
                    className="signupform"
                    onSubmit={handleForm}
                >
                    <h2>Login to Your Account</h2>
                    
                    <div className="input">
                       
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={input.email}
                            name='email'
                            onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={input.password}
                            name='password'
                            onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}
                        />
                         <select value={input.role} name='role' onChange={(e) => setInput({...input, [e.target.name]: e.target.value })}>
                            <option value="admin">admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <Button variant='contained' fullWidth type='submit'>
                        {
                            loading ? (<CircularProgress color='' width={'30px'} />) : ('Login')
                        }
                    </Button>
                    <p>Does not have Account? then <Link to={'/signup'} className='link'><span className='sp'>Signup</span></Link></p>
                </form>
            </div>
        </>
    )
}

export default Login