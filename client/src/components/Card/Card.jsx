import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { getMovie } from '../../state/movies'
import { genreIds } from '../../utils/utils'
import StarIcon from '@mui/icons-material/Star'
import './card.scss'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { removeFromFavorite, setNewFavorite } from '../../state/login'

const Card = () => {
    let location = useLocation()
    const { id } = useParams()
    const dispatch = useDispatch()
    const media = location.pathname.split('/')[2]
    const user = useSelector((state) => state.login)
    const [content, setContent] = useState({})

    const data = media === 'series' ? 'serie' : 'movie'

    
    useEffect(() => {
        axios.get(`/api/media/${data}/${id}`).then((res)=>setContent(res.data))
    }, [])

    const handleAddFavorites = () => {
        user._id && dispatch(setNewFavorite(content))
     }
     const handleRemoveFavorites = () => {
         user._id && dispatch(removeFromFavorite(content))
     }

    return (
        <div className="mainCard">
            {content.id ? (
                <>
                    <div className="infoCard">
                <div className="image">
                    <img src={`https://image.tmdb.org/t/p/w342${content.poster_path}`} alt="" />
                </div>
                <div className="info">
                    <span style={{fontSize:'1.2rem', fontWeight:'600'}}>{content.title}</span>
                    <span>{content.overview}</span>
                    <div className="info2">
                        {content.genres.map((genre, i) => (
                            <div key={i} className="date">
                                {genreIds[genre.id]}
                            </div>
                        ))}
                        {media === 'movies' ? (
                            <div className="date">{content.release_date.slice(0, 4)}</div>
                        ) : (
                            <div className="date">{content.first_air_date.slice(0, 4)}</div>
                        )}
                        <div className="date">
                            {content.vote_average}
                            <StarIcon />
                                </div>
                                <div>
                                <AddIcon onClick={handleAddFavorites} sx={{margin:'10px', '&:hover':{color:'#1b94cc'},cursor:'pointer'}} />
                                <RemoveIcon onClick={handleRemoveFavorites} sx={{margin:'10px', '&:hover':{color:'#f82e2e'},cursor:'pointer'}}/>

                            </div>
                    </div>
                </div>
            </div>
                    <div className="trailer"></div></>) : 
                (
                    <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems:'center' }}>
                        <CircularProgress/>
                    </Box>
                )

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        }

        </div>
    )
}

export default Card
