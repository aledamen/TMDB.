import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { removeFromFavorite, setNewFavorite } from '../../state/login'
import { getMovie } from '../../state/movies'
import { getSerie } from '../../state/series'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const ListCards = ({ data }) => {

    const [isHovered, setIsHovered] = useState(false)
    const title = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 1]
    const navigate = useNavigate()
    const user = useSelector((state) => state.login)
    const description = data.overview && `${data.overview.slice(0, 60)}...`
    const dispatch = useDispatch()

    const handleAddFavorites = () => {
        user._id && dispatch(setNewFavorite(data))
    }
    const handleRemoveFavorites = () => {
        user._id && dispatch(removeFromFavorite(data))
    }
        const handleWatchNow = () => {
        data.name ?dispatch(getSerie(data.id)).then(() => navigate(`/media/series/${data.id}`))
        : dispatch(getMovie(data.id)).then(() => navigate(`/media/movies/${data.id}`))
        
    }
    return (
        <>
            {data.poster_path ?
                <div
                className="listItem"
                style={{ left: isHovered && 225 - 50 * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} alt="" className="imgCard" />

                {isHovered && (
                    <>
                        <div className="itemInfo">
                            <div className="divHoverImg">
                                <img
                                    src={`https://image.tmdb.org/t/p/w300/${data.backdrop_path}`}
                                    alt=""
                                    className="hoverImg"
                                />
                            </div>
                            <div className="divInfo">
                                <span className="title">{data.title ? data.title : data.name}</span>
                                <span className="description">{description}</span>
                            </div>
                            <div className="genreAndFav">
                                <button
                                    onClick={handleWatchNow}
                                    className="button"
                                >
                                    <PlayArrowIcon className="playArrow" />
                                </button>
                                <div>
                                    <AddIcon
                                        onClick={handleAddFavorites}
                                        sx={{ margin: '5px', '&:hover': { color: '#1b94cc' } }}
                                    />
                                    <RemoveIcon
                                        onClick={handleRemoveFavorites}
                                        sx={{ margin: '5px', '&:hover': { color: '#f82e2e' } }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            : (
            <div>
                <img className="notFound" src={`https://aprende-a-programar.com/img/noImage.jpg`} alt="" />
                <span>{title === 'users' && data.username.toUpperCase()}</span>
            </div>
            )}
        </>
    )
}

export default ListCards
