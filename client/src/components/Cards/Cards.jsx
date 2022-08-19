import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import './cards.scss'
import ListCards from '../ListCards/ListCards'


const Cards = (props) => {
    const name = Object.keys(props)[0]
    const data = props[name]
    const [isHovered, setIsHovered] = useState(false)


    return (
        <div className="mainDivSearchs" style={{ left: isHovered  && 225 - 50  * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
            {data  ? (
                <div className="searchMovies">
                    <div className="moviesName">
                        <span>{name.toUpperCase()}</span>
                    </div>
                    <div className="cardMovies">
                        {data.map((item,i) => <ListCards key={i} data={item}/>)}
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
                    <div style={{ margin: '10px' }}></div>
                    <CircularProgress />
                </Box>
            )}
        </div>
    )
}

export default Cards
