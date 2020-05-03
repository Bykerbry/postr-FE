import axios from 'axios'
import { loadPosts } from '../../actions/postActions'

const loadUserPosts = (dispatch) => {
    axios.get('http://localhost:8080/posts/me')
    .then(response => {
        dispatch(loadPosts(response.data))
    })
    .catch(error => {
        console.log(error)
    })
}

export default loadUserPosts