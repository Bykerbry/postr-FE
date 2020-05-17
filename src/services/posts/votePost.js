import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

/**
 * 
 * @param {string} action Can be set to "cast" to cast vote or "remove" to remove vote.
 * @param {string} target Can be set to "up" to up-vote, or "down" to down-vote.
 * @param {string} id The id of the post being voted upon.
 * @param {function} dispatch Redux dispatch function.
 */

const votePost = (action, target, id, dispatch) => {
    axios.patch(`http://localhost:8080/posts/${action}/${target}/${id}`)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default votePost