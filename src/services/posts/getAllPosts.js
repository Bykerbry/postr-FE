import axios from 'axios'
import { loadAllPosts } from '../../actions/postActions'

const getAllPosts = (dispatch) => {
    axios.get('http://localhost:8080/posts/all')
        .then(response => {
            dispatch(loadAllPosts(response.data))
        })
        .catch(error => {
            console.log(error)
        })
}

export default getAllPosts