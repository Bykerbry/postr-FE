import React, { useState, useRef } from 'react'
import axios from 'axios'
import ImageCropper from './ImageCropper'
import { connect } from 'react-redux'
import { userUpdated } from '../actions/userActions'

import uploadImage from '../services/users/uploadImage'
import styles from '../styles/components/UploadImage.module.scss'

const UploadImage = ({user, dispatch}) => {
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    const [isCropping, setIsCropping] = useState(false)
    const imgContainer = useRef(null)

    const handleFileChosen = e => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        console.log("form was submitted...")
        formData.append('profilePicture', image)
        // uploadImage(formData, dispatch)
        axios.post('http://localhost:8080/users/me/profile-picture', formData)
        .then(response => {
            console.log(response.data)
            dispatch(userUpdated({info: response.data}))
            setIsCropping(true)
        })
        .catch(error => {
            console.log(error)
            setError(error.message)
        })
    }
    // const handleCrop = () => {
    //     console.log(image)
    //     setIsCropping(true)
    // }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='profilePicture' className={styles.chooseFileBtn}>Upload Image</label>
                {image && <p className={styles.fileName}>{image.name}</p>}
                {error && <p className={styles.fileName}>{error}</p>}
                <input style={{'display': 'none'}} id='profilePicture' type='file' onChange={handleFileChosen}/>
                {
                    image && <button className={styles.submitBtn} >Format Your Picture</button>
                }
                {
                    image && <button className={styles.submitBtn} type='submit'>Make Profile Picture</button>
                }
            </form>
            {
                isCropping && 
                <ImageCropper profilePicture={user.info.profilePicture}/>
            }
        </div>
    )
}

export default connect((state) => ({
    user: state.user
}))(UploadImage)
