import axios from 'axios'

const updatePost = ( id ,{dispatch}) => {
    axios.patch('http://localhost:8080/posts/update/' + id)
        .then(response => {

        })
        .catch(error => {

        })
}

export default updatePost