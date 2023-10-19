import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { movie: [], lodaing: false, Error: '' }
let headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
}
export let getTrendingMovie = createAsyncThunk('trendMovie/getmovie',
    async () => {
        let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US',{headers})
        return data.results
    })

let trendingMovieSlice = createSlice({
    name: 'trendMovie',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrendingMovie.pending, (state, action) => {
            state.lodaing = true
        })
        builder.addCase(getTrendingMovie.fulfilled, (state, action) => {
            state.lodaing = false
            state.movie = action.payload
        })
        builder.addCase(getTrendingMovie.rejected, (state, action) => {
            state.lodaing = false
            state.Error = action.payload
        })
    }
})

export let trendingMovieRuducer = trendingMovieSlice.reducer