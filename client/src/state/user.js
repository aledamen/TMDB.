import { createReducer, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'

export const getAllUsers = createAsyncThunk("GET_ALL_USERS", async () => {
    const res = await axios.get("/api/user");
    return res.data;
});

export const allUsersReducer = createReducer([], { 
    [getAllUsers.fulfilled]:(state,action) => action.payload
})
