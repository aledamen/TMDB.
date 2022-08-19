import { createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const getSearchMedia = createAsyncThunk("GET_SEARCH_MEDIA", async (string) => {
    const res = await axios.get(`/api/media/search/${string}`);
    return res.data;
  });
const searchReducer = createReducer([], { 
    [getSearchMedia.fulfilled]:(state,action) => action.payload,

})
  
export default searchReducer;