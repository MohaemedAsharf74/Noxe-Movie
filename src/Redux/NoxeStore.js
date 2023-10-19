import { configureStore } from "@reduxjs/toolkit";
import { trendingMovieRuducer } from "./trendMovieSlice";
import { trendingTvReducer } from "./trendingTvSlice";
import { trendingPeopleReducer } from "./trendPeople";
import { getDetailesRoducer } from "./detailsSlice";
import { getTrendRoducer } from "./trendSlice";
import { getPopularRoducer } from "./popular";

export let store = configureStore({
    reducer: {
        getMovie: trendingMovieRuducer,
        getTv: trendingTvReducer,
        getPeople: trendingPeopleReducer,
        getDetailes: getDetailesRoducer,
        getTrend: getTrendRoducer,
        getPopular: getPopularRoducer
    }
})
