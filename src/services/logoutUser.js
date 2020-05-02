import axios from 'axios'
import { removeAuth } from '../actions/userActions'
import { setError } from '../actions/errorActions'



const logoutUser = (props) => {
    axios.post('http://localhost:8080/users/logout')
        .then(response => {
            localStorage.removeItem('authToken')
            props.dispatch(removeAuth())
            props.history.push('/login')
            delete axios.defaults.headers.common['Authorization']
        })
        .catch(error => {
            error.response ? props.dispatch(setError(error.response.data)) : props.dispatch(setError(error.message))
        })
}

export default logoutUser

