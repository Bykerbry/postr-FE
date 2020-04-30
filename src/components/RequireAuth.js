import React from 'react'
import { Redirect } from 'react-router-dom'
import * as jwt from 'jwt-decode'

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('authToken')

    if (!token) {
        console.log('no authToken')
        return <Redirect to="/login" />
    }

    const decoded = jwt(token)
    const now = Date.now() / 1000

    if (now > decoded.exp) {
        return <Redirect to='/login' />
    }

    return children
}

export default RequireAuth
