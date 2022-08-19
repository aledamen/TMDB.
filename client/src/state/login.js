import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const sendMe = createAsyncThunk('ME', async () => {
    const auth = await axios.get('/api/auth/me')
    const res = await axios.get(`/api/user/${auth.data._id}`)
    return res.data
})

export const signUpRequest = createAsyncThunk('SIGNUP', async (info) => {
    const res = await axios.post('/api/auth/signup', info)
    return res.data
})

export const sendLoginRequest = createAsyncThunk('LOGIN', async (info) => {
    const login = await axios.post('/api/auth/login', info)
    const res = await axios.get(`/api/user/${login.data._id}`)
    console.log('LARES', res)
    return res.data
})

export const sendLogOutRequest = createAsyncThunk('LOGOUT', async () => {
    const res = await axios.post('/api/auth/logout')
    return res.data
})

export const updateUser = createAsyncThunk('UPDATE_USER', async (data) => {
    const { id } = data
    const res = await axios.put(`/api/user/${id}`, data)
    return res.data
})

export const deleteUser = createAsyncThunk('DELETE_USER', async (id) => {
    const res = await axios.delete(`/api/user/${id}`)
    return res.data
})

export const setNewFavorite = createAsyncThunk('SET_FAVORITE', async (data, thunkAPI) => {
    const id = thunkAPI.getState().login._id
    const res = await axios.put(`/api/user/${id}/setfavorites`, data)
    return res.data
})

export const removeFromFavorite = createAsyncThunk('REMOVE_FAVORITE', async (data, thunkAPI) => {
    const id = thunkAPI.getState().login._id
    const res = await axios.put(`/api/user/${id}/removefavorites`, data)
    return res.data
})

const loginReducer = createReducer([], {
    [sendMe.fulfilled]: (state, action) => action.payload,
    [signUpRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [sendLogOutRequest.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
    [deleteUser.fulfilled]: (state, action) => action.payload,
    [setNewFavorite.fulfilled]: (state, action) => action.payload,
    [removeFromFavorite.fulfilled]: (state, action) => action.payload,
})

export default loginReducer
