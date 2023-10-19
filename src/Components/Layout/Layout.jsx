import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { userContext } from '../../context/userToken'

export default function Layout() {
    let { token, setToken } = useContext(userContext)
    setToken(localStorage.getItem('token'))
    console.log(token);
    return <>
        <div className='pt-5'>
            <Navbar />
            <div className='py-3 lay'>
                <Outlet />
            </div>
            
            <Footer />
        </div>

    </>
}
