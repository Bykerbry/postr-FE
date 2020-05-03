import React from 'react';
import { connect } from 'react-redux';


const ProfilePage = (props) => (
    <p>Welcome {props.user.info.firstName}!</p>
)

export default connect(state => ({
    user: state.user
}))(ProfilePage)