import React from 'react'
import { useNavigate } from 'react-router-dom'
import './featured.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { numberRandom } from '../../utils/utils'
import { genreIds } from '../../utils/utils'
import { useDispatch } from 'react-redux'
import { getMovie } from '../../state/movies'

const Featured = ({ movies }) => {
    
    const number = numberRandom()
    const backdropPath = movies[number].backdrop_path
    const posterPath = movies[number].poster_path
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleWatchNow = () => {
        dispatch(getMovie(movies[number].id)).then(()=>navigate(`/media/movies/${movies[number].id}`))
    }
    return (
                <div className="featured">
                    <img className="poster" src={`https://image.tmdb.org/t/p/w1280${backdropPath}`} alt={movies[number].title} />
                    <div className="info">
                        <img src={`https://image.tmdb.org/t/p/w185${posterPath}`} alt={movies[number].title} />
                        <span className="title">{movies[number].title}</span>
                        <div className="info2">
                            {movies[number].genre_ids.map((genre, i) => (
                                    <div key={i} className="date">
                                        {genreIds[genre]}
                                    </div>
                                ))}
                            <div className="date">{movies[number].release_date.substring(0, 4)}</div>
                        </div>
                        <div className="buttons">
                            <button onClick={handleWatchNow} className="button">
                                <PlayArrowIcon className="playArrow" />
                                <span>Watch Now</span>
                            </button>
                        </div>
                    </div>
                </div>
    )
}

export default Featured
