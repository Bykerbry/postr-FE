import React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeAuth } from '../actions/user';


const Header = (props) => (
    <div>
        <nav>
            { props.user.authToken ? (
                <div>
                    <NavLink to="/">Profile</NavLink>
                    <NavLink to="/feed">Feed</NavLink>          
                    <NavLink to="/help">Help</NavLink>
                    <button onClick={() => {
                        localStorage.removeItem('authToken')
                        props.dispatch(removeAuth())
                        return <Redirect to="/login" />
                    }}>Logout</button>
                </div>
            ) : (
                <div>
                    <NavLink to="/help">Help</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            )}
        </nav>
    </div>
)

export default connect((state) => {
    return {
        user: state.user
    }
})(Header)

