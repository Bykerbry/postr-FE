import axios from 'axios'
import { loadUserPosts } from '../../actions/postActions'

const getUserPosts = (dispatch) => {
    axios.get('http://localhost:8080/posts/me')
    .then(response => {
        dispatch(loadUserPosts(response.data))
    })
    .catch(error => {
        console.log(error)
    })
}

export default getUserPosts
