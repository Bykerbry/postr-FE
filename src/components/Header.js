import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { removeAuth } from '../actions/userActions';
import logoutUser from '../services/logoutUser';


const Header = (props) => {
    console.log(props)
    return (
    
    <div>
        <nav>
            { props.user.authToken ? (
                <div>
                    <NavLink to="/">Profile</NavLink>
                    <NavLink to="/feed">Feed</NavLink>          
                    <NavLink to="/help">Help</NavLink>
                    <button onClick={() => {
                        console.log(props)
                        logoutUser(props)}}>Logout</button>
                </div>
            ) : (
                <div>
                    <NavLink to="/help">Help</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            )}
        </nav>
    </div>
)}

// wrap with router and use service to logout

export default connect((state) => {
    return {
        user: state.user
    }
})(withRouter(Header))

