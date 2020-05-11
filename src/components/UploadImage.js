import React, { useState } from 'react'
import { connect } from 'react-redux'
import uploadImage from '../services/users/uploadImage'
import styles from '../styles/components/UploadImage.module.scss'

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
            <label htmlFor='profilePicture' className={styles.chooseFileBtn}>Upload Image</label>
            {image && <p className={styles.fileName}>{image.name}</p>}
            <input style={{'display': 'none'}} id='profilePicture' type='file' onChange={handleFileChosen}/>
            {
                image && <button className={styles.submitBtn} type='submit'>Make Profile Picture</button>

            }
        </form>
    )
}

export default connect((state) => ({
    user: state.user
}))(UploadImage)
