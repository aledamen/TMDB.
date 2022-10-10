import React from 'react'
import './home.scss'
import Featured from '../Featured/Featured'
import List from '../List/List'
import { useDispatch } from 'react-redux'

import { Box, CircularProgress } from '@mui/material'

const Home = ({movies, series}) => {
    return (
        <>
            {movies && series ? (
                <div className="home">
                    <Featured movies={movies} />
                    <List movies={movies} />
                    <List series={series} />
                </div>
            ) : (
                <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
        </>
    )
}

export default Home
