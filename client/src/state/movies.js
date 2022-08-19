import { createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const getAllMovies = createAsyncThunk("GET_ALL_MOVIES", async () => {
  const res = await axios.get("/api/media/movie");
    return res.data;
});

export const getMovie = createAsyncThunk("GET_MOVIE", async (id) => {
  const res = await axios.get(`/api/media/movie/${id}`);
  return res.data;
});

export const allMoviesReducer = createReducer([], { 
    [getAllMovies.fulfilled]:(state,action) => action.payload,

})
export const oneMovieReducer = createReducer([], { 
  [getMovie.fulfilled]:(state,action) => action.payload,
})
