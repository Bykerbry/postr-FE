import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as jwt from 'jwt-decode'
import { setAuth } from '../actions/userActions'

// None of the authenticaed routes are attempting to display therefore, RequireAuth never runs

const RequireAuth = (props) => {
    const token = localStorage.getItem('authToken')
    console.log(props)

    if (!token) {
        console.log('no authToken')
        return <Redirect to="/login" />
    }

    const decoded = jwt(token)
    const now = Date.now() / 1000

    if (now > decoded.exp) {
        return <Redirect to='/login' />
    }

    props.dispatch(setAuth({authToken: token}))
    console.log(props)
    return props.children
}

export default connect( (state) => {
    return {
        user: state.user
    }
})(RequireAuth)

// export default RequireAuth


