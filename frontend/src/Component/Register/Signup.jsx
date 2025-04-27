import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Signup = () => {

    const navigate = useNavigate();
    const { authUser } = useSelector(store => store.user);

    const [image, setImage] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); 
    const [loading, setLoading] = useState(false)

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("password", password);
            myForm.set("role", role);
            if (image) myForm.append("file", image);

            const res = await axios.post('https://dhosaplaza.onrender.com/api/v1/user/register', myForm, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                setName("");
                setEmail("");
                setPassword("");
                setImage(false);
                setRole("user");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
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
                    encType='multipart/form-data'
                >
                    <h2>Signup To DhosaPlaza</h2>
                    <div className="mysignup">
                        <input
                            type="file"
                            accept='image/*'
                            hidden
                            id='image'
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label htmlFor="image">
                            <img src={ image ? URL.createObjectURL(image) : "https://static-00.iconduck.com/assets.00/profile-major-icon-1024x1024-9rtgyx30.png"} width={'100vw'} />
                        </label>
                    </div>
                    <div className="input">
                        <input
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <Button variant='contained' fullWidth type='submit'>
                        {
                            loading ? (<CircularProgress color='' width={'30px'} />) : ('Signup')
                        }
                    </Button>
                    <p>Already have Account? then <Link to={'/login'} className='link'><span className='sp'>Login</span></Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup