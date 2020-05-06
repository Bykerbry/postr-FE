import axios from 'axios'
import { postCreated } from '../../actions/postActions'

const createPost = ({dispatch}, postData) => {
    axios.post('http://localhost:8080/posts', postData)
        .then(response => {
            dispatch(postCreated(response.data))
        })
        .catch(error => console.log(error))
}

export default createPost