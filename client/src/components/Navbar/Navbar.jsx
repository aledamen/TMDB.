import React, { useState } from 'react'
import './navbar.scss'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { sendLogOutRequest } from '../../state/login'
import { getSearchMedia } from '../../state/search'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [search, setSearch] = useState('')
    const user = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        dispatch(sendLogOutRequest()).then(() => navigate('/'))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        search && dispatch(getSearchMedia(search)).then(() => navigate(`/media/search/${search}`))
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleProfile = (e) => {
        e.preventDefault()
        navigate(`/users/profile/${user._id}`)
    }

    return (
        <>
            <div className={scrolled ? 'navbar scrolled' : 'navbar'}>
                <div className="container">
                    <div className="left">
                        <Link className="links" to="/">
                            <LiveTvIcon
                                sx={{
                                    textDecoration: 'inherit',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    '&:hover': { color: '#1b94cc' },
                                }}
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="center">
                        <form onSubmit={handleSubmit}>
                            <input
                                className="searchInput"
                                onChange={handleSearch}
                                type="text"
                                name=""
                                placeholder="Search"
                            />
                            <button className="searchButton" type="submit">
                                {' '}
                                <SearchIcon
                                    sx={{ '&:hover': { color: '#1b94cc' } }}
                                    style={{ marginLeft: '6px', paddingTop: '2px', width: '35px', height: '35px' }}
                                    className="icon"
                                />
                            </button>
                        </form>
                    </div>
                    <div className="right">
                        <Link className="links" to="/media/movies">
                            <span className="xl">Movies</span>
                        </Link>
                        <Link className="links" to="/media/series">
                            <span className="xl">Series</span>
                        </Link>
                        <Link className="links" to="/users">
                            <span className="xl">Users</span>
                        </Link>
                        <span className="m">
                            {user.username ? (
                                <Link className="links" to="/users/profile/:id">
                                    Profile
                                </Link>
                            ) : (
                                <Link className="links" to="/login">
                                    LogIn
                                </Link>
                            )}
                        </span>
                        <span className="m">
                            {user.username ? (
                                    <Link className="links" to="/users/profile/:id">
                                        LogOut
                                    </Link>

                            ) : (
                                    <Link className="links" to="/signup">
                                        SignUp
                                    </Link>
                            )}
                        </span>
                        <div className="profile">
                            {user.username ? (
                                <PersonIcon
                                    className="icon"
                                    sx={{ color: '#1b94cc' }}
                                    style={{ marginLeft: '52px', width: '40px', height: '40px' }}
                                />
                            ) : (
                                <PersonIcon className="icon" />
                            )}

                            {user.username ? (
                                <div className="options">
                                    <button onClick={handleProfile} className="linksProfile" to="/users/profile/:id">
                                        <span>Profile</span>
                                    </button>
                                    <button className="linksProfile" onClick={handleLogOut} to="/">
                                        <span>LogOut</span>
                                    </button>{' '}
                                </div>
                            ) : (
                                <div className="options">
                                    <Link className="linksProfile" to="/signup">
                                        <span>SignUp</span>
                                    </Link>
                                    <Link className="linksProfile" to="/login">
                                        <span>LogIn</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
