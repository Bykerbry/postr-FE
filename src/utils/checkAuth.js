import axios from 'axios'
import * as jwt from 'jwt-decode'
import { userLogout } from '../actions/appActions';
import readUser from '../services/users/readUser'
import getUserPosts from '../services/posts/getUserPosts'


const checkAuth = ({dispatch}) => {
    if (localStorage.authToken) {
        const token = localStorage.authToken
        const decoded = jwt(token)
        const now = Date.now() / 1000
        if ( now > decoded.exp) {
            localStorage.removeItem('authToken')
            delete axios.defaults.headers.common['Authorization']
            dispatch(userLogout())
            window.location.href = './login'
        } else {
            readUser(token, dispatch)
            getUserPosts(dispatch)
        }
    } 
} 

export default checkAuth
