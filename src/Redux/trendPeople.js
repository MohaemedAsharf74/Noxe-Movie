import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState = { people: [], loading: false, Error: '' }
let headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
}
export let getTrendingPeople = createAsyncThunk('trendpeople/getpeople',
    async () => {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/person/week?language=en-US', { headers })
        return data.results
    })

export let trendingPeople = createSlice({
    name: 'trendpeople',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrendingPeople.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getTrendingPeople.fulfilled, (state, action) => {
            state.loading = false
            state.people = action.payload
        })
        builder.addCase(getTrendingPeople.rejected, (state, action) => {
            state.loading = false
            state.Error = action.payload
        })
    }
})

export let trendingPeopleReducer = trendingPeople.reducer