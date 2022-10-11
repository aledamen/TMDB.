import Home from './components/Home/Home'
import './app.scss'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router'
import Register from './components/Register/Register'
import Cards from './components/Cards/Cards'
import Card from './components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserLogged, sendMe } from './state/login'
import { getAllMovies } from './state/movies'
import { getAllSeries } from './state/series'
import { Box, CircularProgress } from '@mui/material'
import { getAllUsers } from './state/user'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sendMe())
        dispatch(getAllMovies())
        dispatch(getAllSeries())
        dispatch(getAllUsers())
    }, [])

    const movies = useSelector((state) => state.movies.results)
    const series = useSelector((state) => state.series.results)
    const users = useSelector((state) => state.users)
    const search = useSelector((state) => state.search.results)

    return (
        <div className="app">
            <Navbar />
            {movies && series ? (
                <Routes>
                    <Route path="/" element={<Home movies={movies} series={series} />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Register />} />
                    <Route path="/users" element={<Cards users={users} />} />
                    <Route path="/users/:id" element={<Profile />} />
                    <Route path="/users/profile/:id" element={<Profile />} />
                    <Route path="/media/search/:search" element={<Cards search={search} />} />
                    <Route path="/media/movies" element={<Cards movies={movies} />} />
                    <Route path="/media/movies/:id" element={<Card />} />
                    <Route path="/media/series" element={<Cards series={series} />} />
                    <Route path="/media/series/:id" element={<Card />} />
                </Routes>
            ) : (
                <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            <Footer/>
        </div>
    )
}

export default App
