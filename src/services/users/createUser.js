import axios from 'axios'
import { setUser, setAuth } from '../../actions/userActions'
import { setError, removeError } from '../../actions/errorActions'


const createUser = (userInfo, {dispatch, history}) => {
    axios.post('http://localhost:8080/users', userInfo)
        .then(response => {
            const {  _id, firstName, lastName, email } = response.data.user
            localStorage.setItem('authToken', response.data.token)
           history.push('/')
           dispatch(setUser({info: {
                _id,
                firstName,
                lastName,
                email
            }}))
           dispatch(setAuth({authToken: response.data.token}))
           dispatch(removeError())
            axios.defaults.headers.common['Authorization'] = response.data.token
        })
        .catch(error => {
            error.response ?dispatch(setError(error.response.data)) :dispatch(setError(error.message))
        })

}

export default createUser
