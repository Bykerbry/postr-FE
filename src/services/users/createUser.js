import axios from 'axios'
import loginTryCB from '../../utils/loginTryCB'
import { setError } from '../../actions/errorActions'


const createUser = (userInfo, {dispatch, history}) => {
    axios.post('http://localhost:8080/users', userInfo)
        .then(response => {
            loginTryCB(response, dispatch, history)
        })
        .catch(error => {
            const e = error.response.data
            console.log(e)
            if (e.errmsg) {
                dispatch(setError({
                    email: {
                        attempt: userInfo.email, 
                        message: 'An account associated with that email address already exists.'
                    }
                }))
            } else {
                dispatch(setError(e.errors))
            }
          
        })

}

export default createUser
