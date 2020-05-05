import axios from 'axios'
import { setError } from '../../actions/errorActions'
import getUserPosts from '../posts/getUserPosts'
import loginTryCB from '../../utils/loginTryCB'

const loginUser = (loginInfo, {dispatch, history}) => {
    axios.post('http://localhost:8080/users/login', loginInfo)
        .then(response => {
            loginTryCB(response, dispatch, history)
            getUserPosts(dispatch)
        })
        .catch(error => {
            error.response ? dispatch(setError(error.response.data)) : dispatch(setError(error.message))
        })
}

export default loginUser
