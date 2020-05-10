import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logoutUser from '../services/users/logoutUser';
import styles from '../styles/components/Header.module.scss'


const Header = (props) => (
    <div>
        <nav className={styles.nav}>
            <h1>Postr</h1>
            { props.user.authToken ? (
                <div className={styles.navContainer}>
                    <NavLink className={styles.link} to="/">Profile</NavLink>
                    <NavLink className={styles.link} to="/feed">Feed</NavLink>          
                    <NavLink className={styles.link} to="/help">Help</NavLink>
                    <button onClick={() => logoutUser(props)} className={styles.logoutBtn}>
                        <span className="material-icons" id={styles.logoutIcon}>exit_to_app</span>
                    </button>
                </div>
            ) : (
                <div className={styles.navContainer}>
                    <NavLink className={styles.link} to="/help">Help</NavLink>
                    <NavLink className={styles.link} to="/login">Login</NavLink>
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

