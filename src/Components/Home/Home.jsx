import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrendingMovie } from '../../Redux/trendMovieSlice';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getTrendingTv } from '../../Redux/trendingTvSlice';
import { getTrendingPeople } from '../../Redux/trendPeople';
import { Helmet } from 'react-helmet';

export default function Home() {

    //get movie
    let { movie } = useSelector((state) => state.getMovie)
    console.log(movie);
    //get tv
    let { tv } = useSelector((state) => state.getTv)
    console.log(tv);
    //get people
    let { people } = useSelector((state) => state.getPeople)
    console.log(people);
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTrendingMovie())
        dispatch(getTrendingTv())
        dispatch(getTrendingPeople())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //slider 
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoPlay: true
    };
    return <>
        {movie.length > 0 ? (
            <div className='row my-3 py-5'>
                <div className=' col-md-6 my-3 '>
                    <div className=' w-25 mb-4 text-white'></div>
                    <h2 className='text-white'>
                        Trending Movies For This Week
                    </h2>
                </div>
                <div >
                    <Slider {...settings}>
                        {movie.map((item, index) => (
                            <div className='d-flex align-items-center justify-content-center '>
                                <div key={index} className=' col-md-10 w-100 ' >
                                    <Link className='nav-link mov'
                                        to={`/detailes/${item.id}/${item.media_type}`}
                                    >
                                        <div className='position-relative'>
                                            <div>
                                                <img className='w-100 ' alt='poster' src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} />
                                            </div>
                                            <h6 className=' mt-2 text-white fs-5 text-center'>
                                                {item.title.split(' ').slice(0, 4).join(' ')}
                                            </h6>
                                            <span className=' position-absolute top-0 end-0 bg-primary px-2 py-2 text-white'>
                                                {item.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        ) : (
            <div className='vh-100 d-flex align-items-center justify-content-center '>
                <i className='fa-solid fa-spinner fa-2x fa-spin text-white'></i>
            </div>
        )}
        {tv.length > 0 ? (
            <div className='row my-3 py-5'>
                <div className=' col-md-6 my-3 '>
                    <div className=' w-25 mb-4 text-white'></div>
                    <h2 className='text-white'>
                        Trending Tv Show For This Week
                    </h2>
                </div>
                <div >
                    <Slider {...settings}>
                        {tv.map((item, index) => (
                            <div className='d-flex align-items-center justify-content-center '>
                                <div key={index} className=' col-md-10 w-100 ' >
                                    <Link
                                        className='nav-link mov'
                                        to={`/detailes/${item.id}/${item.media_type}`}
                                    >
                                        <div className='position-relative'>
                                            <div>
                                                <img className='w-100 ' alt='poster' src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} />
                                            </div>
                                            <h6 className=' mt-2 text-white fs-5 text-center'>
                                                {item.original_name.split(' ').slice(0, 4).join(' ')}
                                            </h6>
                                            <span className=' position-absolute top-0 end-0 bg-primary px-2 py-2 text-white'>
                                                {item.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        ) : (
            <div className='vh-100 d-flex align-items-center justify-content-center '>
                <i className='fa-solid fa-spinner fa-2x fa-spin text-white'></i>
            </div>
        )}
        {people.length > 0 ? (
            <div className='row my-3 py-5'>
                <div className=' col-md-6 my-3 '>
                    <div className=' w-25 mb-4 text-white'></div>
                    <h2 className='text-white'>
                        Trending People For This Week
                    </h2>
                </div>
                <div >
                    <Slider {...settings}>
                        {people.map((item, index) => (
                            <div className='d-flex align-items-center justify-content-center '>
                                <div key={index} className=' col-md-10 w-100' >
                                    <Link
                                        className='nav-link mov'
                                        to={`/detailes/${item.id}/${item.media_type}`}
                                    >
                                        <div className='position-relative'>
                                            <div>
                                                <img className='w-100 ' alt='poster' src={`https://image.tmdb.org/t/p/original${item?.profile_path}`} />
                                            </div>
                                            <h6 className=' mt-2 text-white fs-5 text-center'>
                                                {item.original_name.split(' ').slice(0, 4).join(' ')}
                                            </h6>

                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        ) : (
            <div className='vh-100 d-flex align-items-center justify-content-center '>
                <i className='fa-solid fa-spinner fa-2x fa-spin text-white'></i>
            </div>
        )}
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
        </Helmet>
    </>
}
