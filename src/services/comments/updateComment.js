import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

/**
 * 
 * @param {string} commentId The id of the comment to be updated
 * @param {{comment: string}} updatedComment The new comment
 * @param {*} dispatch Redux dispatch function
 */

const updateComment = (commentId, updatedComment, dispatch) => {
    axios.patch(`http://localhost:8080/posts/comments/${commentId}`, updatedComment)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default updateComment