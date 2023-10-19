import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../context/userToken'

export default function Protected(props) {

    let { token } = useContext(userContext)

    if (token !== null) {
        return props.children
    }
    else {
        return <Navigate to={'/login'} />
    }
}
