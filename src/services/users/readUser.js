import axios from 'axios'
import { setUser, setAuth } from '../../actions/userActions'
import { setError } from '../../actions/errorActions'

const readUser = (token, { dispatch }) => {
    axios.defaults.headers.common['Authorization'] = token
    axios.get('http://localhost:8080/users/me')
        .then(response => {
            const { _id, firstName, lastName, email } = response.data
            dispatch(setUser({info: {
                _id,
                firstName,
                lastName,
                email
            }}))
            dispatch(setAuth({authToken: token}))
        })
        .catch( error => {
            error.response ? dispatch(setError(error.response.data)) : dispatch(setError(error.message))
        })
}

export default readUser