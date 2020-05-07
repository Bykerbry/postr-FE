import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const updatePost = ( id ,updates, dispatch) => {
    axios.patch('http://localhost:8080/posts/update/' + id, updates)
        .then(response => {
            console.log(response.data)
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error)
        })
}

export default updatePost