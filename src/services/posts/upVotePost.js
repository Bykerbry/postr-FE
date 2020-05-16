import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const upVotePost = (id, dispatch) => {
    axios.patch(`http://localhost:8080/posts/up/${id}`)
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default upVotePost