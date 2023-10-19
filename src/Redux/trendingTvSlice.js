import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { tv: [], lodaing: false, Error: '' }
let headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
}
export let getTrendingTv = createAsyncThunk('getTrendingTv/trendingTv',
    async () => {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/tv/week?language=en-US', { headers })
        return data.results
    }
)

export let trendingTv = createSlice({
    name: 'getTrendingTv',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrendingTv.pending, (state, action) => {
            state.lodaing = true
        })
        builder.addCase(getTrendingTv.fulfilled, (state, action) => {
            state.lodaing = false
            state.tv = action.payload
        })
        builder.addCase(getTrendingTv.rejected, (state, action) => {
            state.lodaing = false
            state.Error = action.payload
        })
    }
})

export let trendingTvReducer = trendingTv.reducer;
