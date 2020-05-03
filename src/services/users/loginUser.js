import axios from 'axios'
import { setUser, setAuth } from '../../actions/userActions'
import { setError, removeError } from '../../actions/errorActions'

const loginUser = (up, props) => {
    axios.post('http://localhost:8080/users/login', up)
        .then(response => {
            const { _id, firstName, lastName, email } = response.data.user
            localStorage.setItem('authToken', response.data.token)
            props.history.push('/')
            props.dispatch(setUser({info: {
                _id,
                firstName,
                lastName,
                email
            }}))
            props.dispatch(setAuth({authToken: response.data.token}))
            props.dispatch(removeError())
            axios.defaults.headers.common['Authorization'] = response.data.token
        })
        .catch(error => {
            error.response ? props.dispatch(setError(error.response.data)) : props.dispatch(setError(error.message))
        })
}

export default loginUser