import axios from 'axios'
import * as jwt from 'jwt-decode'
import { removeAuth, removeUser } from '../actions/userActions';
import readUser from '../services/users/readUser'
import loadUserPosts from '../services/posts/loadUserPosts'


const checkAuth = ({dispatch}) => {
    if (localStorage.authToken) {
        const token = localStorage.authToken
        const decoded = jwt(token)
        const now = Date.now() / 1000
        if ( now > decoded.exp) {
            dispatch(removeAuth())
            dispatch(removeUser())
            localStorage.removeItem('authToken')
            delete axios.defaults.headers.common['Authorization']
            window.location.href = './login'
        } else {
            readUser(token, dispatch)
            loadUserPosts(dispatch)
        }
    } 
} 

export default checkAuth