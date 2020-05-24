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

export default voteComment