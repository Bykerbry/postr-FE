import axios from 'axios'
import { postDeleted } from '../../actions/postActions'

const deletePost = ( id , dispatch) => {
    axios.delete('http://localhost:8080/posts/delete/' + id)
        .then(response => {
            dispatch(postDeleted(id))
        })
        .catch(error => {
            console.log(error)
        })
}

export default deletePost