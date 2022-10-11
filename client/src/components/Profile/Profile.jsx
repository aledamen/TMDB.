import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router'
import { deleteUser, removeFromFavorite, sendLogOutRequest, setNewFavorite, updateUser } from '../../state/login'
import './profile.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'

const Profile = () => {
    const user = useSelector((state) => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        id:user._id
    })

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleSubmitUpdate = (e) => {
        dispatch(updateUser(userInfo)).then((res) => navigate(`/users/profile/${res.payload._id}`))
    }
    const handleDeleteUser = (e) => {
        dispatch(deleteUser(user._id)).then(()=>dispatch(sendLogOutRequest())).then(()=>navigate('/'))
    }
    const handleRemoveFavorite = (item) => {
        user._id && dispatch(removeFromFavorite(item))
    }

    return (
        <div className="mainDivProfile">
            {user._id ? (
                <div className="searchMovies">
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="moviesName">
                        <span>{user.favorites ? 'FAVORITES' : 'NO FAVORITES ADDED'}</span>
                    </div>
                    <div className="cardMovies">
                        {user.favorites?.map((item) =>{
                            return item.poster_path ? (
                                <div className='imageFavorites'>
                                    <Link style={{ margin: '0px' }} to={item.name ? `/media/series/${item.id}` : `/media/movies/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} alt="" /></Link>
                                <div>
                                    <DeleteIcon
                                        onClick={()=>handleRemoveFavorite(item)}
                                        sx={{ margin: '5px', '&:hover': { color: '#f82e2e' } }}
                                    />
                                    </div>
                                    
                            </div>) : (
                                <img src={`https://aprende-a-programar.com/img/noImage.jpg`} alt="" />
                            )
                        }
                        )}
                    </div>
                    <div className="moviesName">
                        <span>{'USER INFO'}</span>
                    </div></div>
                    <div className="centerItem">
                        <form onSubmit={handleSubmitUpdate}>
                            <p>Change my data</p>
                            <input
                                onChange={handleChange}
                                name="username"
                                type="text"
                                placeholder="Enter new username"
                            />
                            <input onChange={handleChange} name="email" type="email" placeholder="Enter new email" />
                            <input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                placeholder="Enter new password"
                            />
                            <button onClick={handleSubmitUpdate} type="button">
                                Change
                            </button>
                        </form>
                        <div className="divInfoUser">
                            <div>Username:{user.username}</div>
                            <div>E-mail:{user.email}</div>
                            <div>Favorites:{user.favorites ? user.favorites.length : 0}</div>
                            <button onClick={handleDeleteUser}>DELETE ACCOUNT</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ margin: '20px' }}>SEARCH NOT FOUND</div>
                    <CircularProgress />
                </Box>
            )}
        </div>
    )
}

export default Profile
