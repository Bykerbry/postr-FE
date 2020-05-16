import axios from 'axios'
import { userUpdated } from '../../actions/userActions'

const uploadImage = (imageFile, dispatch) => {
    axios.post('http://localhost:8080/users/me/profile-picture', imageFile)
    .then(response => {
        dispatch(userUpdated({info: response.data}))
    })
    .catch(error => {
        console.log(error.message)
    })
}

export default uploadImage