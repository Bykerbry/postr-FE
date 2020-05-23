import axios from 'axios'
import { postUpdated } from '../../actions/postActions'

const createCommment = (id, comment, dispatch) => {
    axios.post(`http://localhost:8080/posts/comments/${id}`, comment )
        .then(response => {
            dispatch(postUpdated(response.data))
        })
        .catch(error => {
            console.log(error.message)
        })
}

export default createCommment