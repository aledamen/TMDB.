import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

export const numberRandom = () => {
    const number = Math.floor(Math.random() * (19 - 0))
    return number
}
export const genreIds = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10759: 'Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
}

export const userExist = (favorites) => {
    if (favorites[0]===undefined) return false
    else return true
}
const handleFavorite = () => {
    
}

export const renderedFavs = (boolean, arrFavs, movieId) => {
    let res = < FavoriteBorderOutlinedIcon onClick={handleFavorite} className="iconFav" />
    if (boolean) {
        arrFavs.forEach(fav => {
            if (fav.id === movieId) {
                res = < FavoriteOutlinedIcon onClick={handleFavorite} className="iconFav" />
            }
        });
    }
    return res
}