import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { popular: {}, loading: false, Error: '' }

let headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
}
export let getPopularData = createAsyncThunk('popular/getpopular',
    async (type, page) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`, { headers })
        return data
    })
export let getPopular = createSlice({
    name: 'popular',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getPopularData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getPopularData.fulfilled, (state, action) => {
            state.loading = false
            state.popular = action.payload
        })
        builder.addCase(getPopularData.rejected, (state, action) => {
            state.loading = false
            state.Error = action.payload
        })
    }
})

export let getPopularRoducer = getPopular.reducer