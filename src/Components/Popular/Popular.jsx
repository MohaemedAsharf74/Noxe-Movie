import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Popular() {

    //get popular by use state
    const [populars, setPopulars] = useState({})
    let headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU4Y2Q0Y2Q2ODUyYzk3MDZjMDk0ZTkyMDI3YjExMiIsInN1YiI6IjY1MmRiMjE5MDI0ZWM4MDEwMTUzMzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7H9exxV3m0g7KfaFI-RCT8RzFYt4c-mI_UqXjxSjUcg'
    }
    async function getPopular(type, page) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`, { headers })
        setPopulars(data)
    }

    // get detailes by redux
    // let dispatch = useDispatch()
    // let { popular } = useSelector((state) => state.getPopular)
    // console.log(popular);
    let params = useParams()
    console.log(populars);
    useEffect(() => {
        // dispatch(getPopularData(params.type, "1"))
        getPopular(params.type, '1')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getPopular(params.type, '1')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.type])
    //search popular
    async function Search(item, type) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/${type}?query=${item}`, { headers })
        setPopulars(data)
    }
    return <>

        <div className='my-4'>
            <form action="" className="form-inline mb-3 d-flex justify-content-center" >
                <input onChange={(e) => { e.target.value === '' ? setPopulars(params.type, '1') : Search(e.target.value, params.type) }} className="form-control mr-sm-2 w-50" type="search" placeholder="Search" aria-label="Search" />
            </form>
            {populars.results !== null ? <div className="row g-4 pt-4">
                {populars.results?.map((ele, ind) => (
                    <div key={ind} className=' col-md-3'>
                        <Link className='nav-link'
                            to={`/detailes/${ele.id}/${params.type}`}
                        >
                            < div className='position-relative mov' >
                                {ele.poster_path ? <img className='w-100' src={`https://image.tmdb.org/t/p/original${ele?.poster_path}`} alt="" />
                                    : <img className='w-100' src={`https://image.tmdb.org/t/p/original${ele?.profile_path}`} alt="" />}
                                {ele.name ? <h6 className=' mt-2 text-white fs-5 text-center'>
                                    {ele.name}
                                </h6> : <h6 className=' mt-2 text-white fs-5 text-center'>
                                    {ele.title?.split(' ').slice(0, 5).join(' ')}
                                </h6>}
                                {ele.vote_average ? <span className=' position-absolute top-0 end-0 bg-primary px-2 py-2 text-white'>
                                    {ele.vote_average?.toFixed(1)}
                                </span> : ''}
                            </div>
                        </Link>
                    </div>
                )
                )}
                <nav aria-label='...' className='py-5'>
                    <ul className='pagination pagination-sm d-flex justify-content-center'>
                        <li onClick={() => setPopulars(params.type, '1')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>1</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '2')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>2</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '3')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>3</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '4')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>4</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '5')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>5</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '6')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>6</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '7')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>7</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '8')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>8</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '9')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>9</Link>
                        </li>
                        <li onClick={() => setPopulars(params.type, '10')} className='page-item p-1'>
                            <Link className='page-link bg-transparent text-white '>10</Link>
                        </li>
                    </ul>
                </nav>
            </div > : ''}
        </div>
    </>
}
