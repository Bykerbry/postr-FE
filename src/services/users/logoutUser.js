import axios from 'axios'
import { setError } from '../../actions/errorActions'
import { userLogout } from '../../actions/appActions'


const logoutUser = ({dispatch, history}) => {
    axios.post('http://localhost:8080/users/logout')
        .then(response => {
            localStorage.removeItem('authToken')
            history.push('/login')
            delete axios.defaults.headers.common['Authorization']
            dispatch(userLogout())
        })
        .catch(error => {
            error.response ? dispatch(setError(error.response.data)) : dispatch(setError(error.message))
        })
}

export default logoutUser
