import React, { useState } from 'react'
import { connect } from 'react-redux'
import uploadImage from '../services/users/uploadImage'

const UploadImage = ({user, dispatch}) => {
    const [image, setImage] = useState('')

    const handleFileChosen = e => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profilePicture', image)
        uploadImage(formData, dispatch)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='file' onChange={handleFileChosen}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default connect((state) => ({
    user: state.user
}))(UploadImage)
