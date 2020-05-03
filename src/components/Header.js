import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logoutUser from '../services/users/logoutUser';


const Header = (props) => (
    <div>
        <nav>
            { props.user.authToken ? (
                <div>
                    <NavLink to="/">Profile</NavLink>
                    <NavLink to="/feed">Feed</NavLink>          
                    <NavLink to="/help">Help</NavLink>
                    <button onClick={() => logoutUser(props)}>Logout</button>
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
})(withRouter(Header))

