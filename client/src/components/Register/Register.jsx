import React from 'react'
import './register.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import { sendLoginRequest, signUpRequest } from '../../state/login'
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    let location = useLocation().pathname.split('/')[1]
    const [userInfo, setUserInfo] = useState({
        username: '',
        email:'',
        password: '',
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleSubmitLogIn = (e) => {
        dispatch(sendLoginRequest(userInfo)).then((res) => res.payload ? navigate("/") : navigate("/login"))
    }
    const handleSubmitSignUp = (e) => {
        dispatch(signUpRequest(userInfo)).then((res) => res.payload ? navigate("/") : navigate("/signup"))
    }
    return (
        <div className="centerItem">
            {location === 'login' ? (
                <form onSubmit={handleSubmitLogIn}>
                    <input onChange={handleChange} name="username" type="text" placeholder="Enter username" />
                    <input onChange={handleChange} name="password" type="password" placeholder="Enter password" />
                    <button onClick={handleSubmitLogIn} type="button">
                        LogIn
                    </button>
                    <p>
                        Not Registered ?<Link className='linkLogged' to="/signup">Create account Now!</Link>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleSubmitSignUp}>
                    <input onChange={handleChange} name="username" type="text" placeholder="Enter username" />
                    <input onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    <input onChange={handleChange} name="password" type="password" placeholder="Enter password" />
                    <button onClick={handleSubmitSignUp} type="button">
                        SignUp
                    </button>
                    <p>
                        Registered ?<Link className='linkLogged' to="/login">Log In</Link>
                    </p>
                </form>
            )}
        </div>
    )
}

export default Register
