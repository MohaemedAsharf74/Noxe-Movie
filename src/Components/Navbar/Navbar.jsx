import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { userContext } from '../../context/userToken'

export default function Navbar() {
    let { token, setToken } = useContext(userContext)
    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        console.log(token);
    }
    console.log(token);
    // useEffect(()=>{
    //     tokens()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    return <>
        <div className='pt-2'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navterm">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" href="#">Noxe</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                        {token ? <div className='w-100 '>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" href="#">Home</NavLink>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Movie
                                    </Link>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to={'/trending/movie'}>Tranding</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to={'/popular/movie'}>Populer</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to={'/topRated/movie'}>Top Rated</Link></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Tv Show
                                    </Link>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to={'/trending/tv'}>Tranding</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to={'/popular/tv'}>Populer</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to={'/topRated/tv'}>Top Rated</Link></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        People
                                    </Link>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to={'/popular/person'}>Populer</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to={'/trending/person'}>Tranding</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div> : ''}


                        <form className="d-flex" >
                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto" >
                                <li className="nav-item d-flex align-items-center">
                                    <i className='fab mx-2 fa-facebook'></i>
                                    <i className='fab mx-2 fa-twitter'></i>
                                    <i className='fab mx-2 fa-instagram'></i>
                                    <i className='fab mx-2 fa-soundcloud'></i>
                                </li>
                                {token != null ? <li className="nav-item">
                                    <Link onClick={logout} className="nav-link" to="login">Logout</Link>
                                </li> :
                                    <>  <li className="nav-item">
                                        <Link className="nav-link active" to='/signup'>Register</Link>
                                    </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to='login'>Login</Link>
                                        </li> </>}
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    </>
}
