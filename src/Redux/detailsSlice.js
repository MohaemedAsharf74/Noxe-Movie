import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { detailes: [], loading: false, Error: '' }
let headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
}
export let getDetaile = createAsyncThunk('detailes/getdetailes',
    async ( id ,type ) => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, { headers })
        return data
    }
)

export let getDetailes = createSlice({
    name: 'detailes',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getDetaile.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getDetaile.fulfilled, (state, action) => {
            state.loading = false
            state.detailes = action.payload
        })
        builder.addCase(getDetaile.rejected, (state, action) => {
            state.loading = false
            state.Error = action.payload
        })
    }
})

export let getDetailesRoducer = getDetailes.reducer