import './listItem.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState } from 'react'
import { genreIds } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorite, setNewFavorite } from '../../state/login'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Link } from 'react-router-dom'

export default function ListItem({ index, data, name }) {
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useDispatch()
    const description = `${data.overview.slice(0, 60)}...`
    const user = useSelector((state) => state.login)

    const handleAddFavorites = () => {
       user._id && dispatch(setNewFavorite(data))
    }
    const handleRemoveFavorites = () => {
        user._id && dispatch(removeFromFavorite(data))
    }

    return (
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
                        <Link to={name == 'movies'?`/media/movies/${data.id}` : `/media/series/${data.id}`} className="button">
                                <PlayArrowIcon className="playArrow" />
                            </Link>
                            <div>
                                <AddIcon onClick={handleAddFavorites} sx={{margin:'10px', '&:hover':{color:'#1b94cc'}}} />
                            <RemoveIcon onClick={handleRemoveFavorites} sx={{margin:'10px', '&:hover':{color:'#f82e2e'}}}/>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
