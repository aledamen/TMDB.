import './listItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { genreIds } from '../../utils/utils'
import { getMovie } from '../../state/movies'
import { getSerie } from '../../state/series'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorite, setNewFavorite } from '../../state/login'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

export default function ListItem({ index, data, name }) {
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const description = `${data.overview.slice(0, 60)}...`
    const user = useSelector((state) => state.login)

    const handleAddFavorites = () => {
       user._id && dispatch(setNewFavorite(data))
    }
    const handleRemoveFavorites = () => {
        user._id && dispatch(removeFromFavorite(data))
    }

    const handleWatchNow = () => {
        name == 'movies'
            ? dispatch(getMovie(data.id)).then(() => navigate(`/media/movies/${data.id}`))
            : dispatch(getSerie(data.id)).then(() => navigate(`/media/series/${data.id}`))
    }

    return (
        // <button style={{all:'unset'}} onClick={handleWatchNow}>
        <div
            className="listItem"
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
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
                        <div className="itemInfoTop">
                            <div className="desc">{description}</div>
                            <div className="divInfo">
                                {data.genre_ids.map((genre, i) => (
                                    <span key={i} className="genre">
                                        {genreIds[genre]}
                                    </span>
                                ))}
                                <span className="limit">{data.vote_average}</span>
                                <span>{data.release_date && data.release_date.slice(0, 4)}</span>
                            </div>
                        </div>
                        <div className="genreAndFav">
                            <button onClick={handleWatchNow} className="button">
                                <PlayArrowIcon className="playArrow" />
                            </button>
                            <div>
                                <AddIcon onClick={handleAddFavorites} sx={{margin:'10px', '&:hover':{color:'#1b94cc'}}} />
                            <RemoveIcon onClick={handleRemoveFavorites} sx={{margin:'10px', '&:hover':{color:'#f82e2e'}}}/>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
        // </button >
    )
}
