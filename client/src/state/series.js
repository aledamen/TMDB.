import { createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const getAllSeries = createAsyncThunk("GET_ALL_SERIES", async () => {
    const res = await axios.get("/api/media/serie");
    return res.data;
});


export const AllSeriesReducer = createReducer([], { 
    [getAllSeries.fulfilled]:(state,action) => action.payload,
})
