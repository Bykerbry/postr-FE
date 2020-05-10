import axios from 'axios'
import { userUpdated } from '../../actions/userActions'

const uploadImage = (imageFile, dispatch) => {
    console.log(imageFile, 'from upload service')
    axios.post('http://localhost:8080/users/me/profile-picture', imageFile)
    .then(response => {
        dispatch(userUpdated({info: response.data}))
    })
    .catch(error => {
        console.log(error)
    })
}

export default uploadImage