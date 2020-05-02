import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthRoute = ({component: Component, user, ...rest}) =>  (
    <Route {...rest} render={(props) => (
        user.authToken ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)

export default connect((state) => {
    return {
        user: state.user
    }
})(AuthRoute)
