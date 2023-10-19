import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrending } from '../../Redux/trendSlice';
import { Link, useParams } from 'react-router-dom';

export default function Trending() {
    let dispatch = useDispatch()
    let { trend } = useSelector((state) => state.getTrend)
    console.log(trend);
    let params = useParams()
    useEffect(() => {
        dispatch(getTrending(params.type))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <div className="row g-4 pt-4 my-4">

            {trend.map((ele, ind) => (
                <div key={ind} className=' col-md-3 '>
                    <Link className='nav-link '
                        to={`/detailes/${ele.id}/${ele.media_type}`}
                    >
                        < div className='position-relative mov' >
                            {ele.poster_path ? <img className='w-100' src={`https://image.tmdb.org/t/p/original${ele?.poster_path}`} alt="" />
                                : <img className='w-100' src={`https://image.tmdb.org/t/p/original${ele?.profile_path}`} alt="" />}
                            {ele.original_name ? <h6 className=' mt-2 text-white fs-5 text-center'>
                                {ele.original_name?.split(' ').slice(0, 5).join(' ')}
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
        </div >
    </>
}
