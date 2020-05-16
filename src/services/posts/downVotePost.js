import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const downVotePost = (id, dispatch) => {
    axios.patch(`http://localhost:8080/posts/down/${id}`)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default downVotePost