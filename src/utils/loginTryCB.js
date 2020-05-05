import axios from 'axios'
import { setUser, setAuth } from '../actions/userActions'
import { removeError } from '../actions/errorActions'

const loginTryCB = (response, dispatch, history) => {
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
}

export default loginTryCB