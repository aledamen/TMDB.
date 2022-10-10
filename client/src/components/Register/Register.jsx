import React from 'react'
import './register.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendLoginRequest, signUpRequest } from '../../state/login'
import { useForm } from 'react-hook-form'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let location = useLocation().pathname.split('/')[1]
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = (data) => {
        if (location === 'login') {
            dispatch(sendLoginRequest(data)).then((res) => (res.payload ? navigate('/') : setOpen(true)))
        } else {
            dispatch(signUpRequest(data)).then((res) => (res.payload ? navigate('/') : setOpen(true)))
        }
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="centerItem">
            {location === 'login' ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        required
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        {...register('username', {
                            required: 'Field required',
                            minLength: { value: 4, message: 'Min length is 4' },
                        })}
                    />
                    {errors.username?.message}
                    <input
                        required
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: 'Field required',
                            minLength: { value: 4, message: 'Min length is 4' },
                        })}
                    />
                    {errors.password?.message}
                    <button onClick={handleSubmit(onSubmit)} type="button">
                        LogIn
                    </button>
                    <p>
                        Not Registered ?
                        <Link className="linkLogged" to="/signup">
                            Create account Now!
                        </Link>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        required
                        name="username"
                        type="text"
                        placeholder="Enter username"
                        {...register('username', {
                            required: 'Field required',
                            minLength: { value: 4, message: 'Min length is 4' },
                        })}
                    />
                    {errors.username?.message}
                    <input
                        required
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        {...register('email', {
                            required: 'Field required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please entar a valid email',
                            },
                        })}
                    />
                    {errors.email?.message}
                    <input
                        required
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: 'Field required',
                            minLength: { value: 4, message: 'Min length is 4' },
                        })}
                    />
                    {errors.password?.message}
                    <button onClick={handleSubmit(onSubmit)} type="button">
                        SignUp
                    </button>
                    <p>
                        Registered ?
                        <Link className="linkLogged" to="/login">
                            Log In
                        </Link>
                    </p>
                </form>
            )}
            {location === 'login' ? (
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error">Please enter a valid email or password!</Alert>
                </Snackbar>
            ) : (
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert severity="error">Data has already exist!</Alert>
                </Snackbar>
            )}
        </div>
    )
}

export default Register
