import axios from 'axios'
import { userUpdated } from '../../actions/userActions'
import { setError } from '../../actions/errorActions'

const updateUser = (updates, dispatch) => {
    axios.patch('http://localhost:8080/users/me/update', updates)
        .then(response => {
            console.log(response)
            dispatch(userUpdated({info: response.data}))
        })
        .catch (error => {
            if(error.response.data.error === "User validation failed: email: Email is invalid") {
                return dispatch(setError({
                    email: {
                        attempt: updates.email,
                        message: 'Please enter a valid email address'
                    }
                }))
            }
            console.log(error.response)
        })
}

export default updateUser