import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const deleteComment = (commentId, dispatch) => {
    axios.delete(`http://localhost:8080/posts/comments/${commentId}`)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default deleteComment