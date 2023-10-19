import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getDetaile } from '../../Redux/detailsSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Details() {

    //get detailes by use state

    const [details, setDetails] = useState({})
    let headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
    }
    async function getDetails(id, mediaType) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`, { headers })
        setDetails(data)
    }
    // get detailes by redux
    // let dispatch = useDispatch()
    // let { detailes } = useSelector((state) => state.getDetailes)
    // console.log(detailes);
    let params = useParams()
    console.log(details);
    console.log(params);
    useEffect(() => {
        // dispatch(getDetaile(params.id, params.type))
        getDetails(params.id, params.type)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <div className="row pt-4 d-flex align-items-center">
            <div className="col-md-4">
                {details.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} className='w-100' alt="" /> 
                : <img src={'https://image.tmdb.org/t/p/w500' + details.profile_path} className='w-100' alt="" />}
            </div>
            <div className="col-md-7 d-flex align-items-center">
                <div>
                    <h1 className=' my-2 text-white'>{details.title} {details.name}</h1>
                    <p className='text-white-50 h5'>{details.overview}{details.biography}</p>
                    {details.release_date ? <div className='text-white h5' >Release Date : {details.release_date}</div> : ''}
                    {details.vote_average ? <div className='text-white h5' >Vote Average : {details.vote_average}</div> : ''}
                    {details.birthday ? <div className='text-white h5' >Birthday : {details.birthday}</div> : ''}
                    {details.vote_count ? <div className='text-white h5' >Vote count : {details.vote_count}</div> : ''}
                    {details.budget ? <div className='text-white h5' >Budget : {details.budget} $</div> : ''}
                    {details.revenue ? <div className='text-white h5' >Revenue : {details.revenue} $</div> : ''}
                </div>

            </div>


        </div>    </>
}

