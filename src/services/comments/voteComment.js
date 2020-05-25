import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const voteComment = (action, target, id, dispatch) => {
    axios.patch(`http://localhost:8080/posts/comments/${action}/${target}/${id}`)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

// Login duplicate emails should not be permitted on BE

export default voteComment