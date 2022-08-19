import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { allMoviesReducer, oneMovieReducer } from './movies'
import searchReducer from './search'
import { AllSeriesReducer, OneSerieReducer } from './series'
import loginReducer from './login'
import { allUsersReducer, updateUserReducer, deleteUserReducer, getFavoritesReducer } from './user'

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        login: loginReducer,
        movies: allMoviesReducer,
        onemovie: oneMovieReducer,
        series: AllSeriesReducer,
        oneserie: OneSerieReducer,
        search: searchReducer,
        users: allUsersReducer,
    },
})

export default store
