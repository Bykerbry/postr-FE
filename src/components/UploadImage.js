import React, { useState, useRef } from 'react'
import ImageCropper from './ImageCropper'
import { connect } from 'react-redux'
import styles from '../styles/components/UploadImage.module.scss'

const UploadImage = ({ dispatch }) => {
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const fileRef = useRef(null)

    const handleFileChosen = e => {
        const file = e.target.files[0]
        console.log(file)
        if (file.size > 1000000) {
            setError('Images must not exceed 1MB in size')
        } else if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setError('Image must be of type .jpeg or .png')
        } else {
            const fileReader = new FileReader()

            fileReader.onloadend = () => {
                setImageUrl(fileReader.result)
            }
            fileReader.readAsDataURL(file)
         
            setImage(file)
            setError('')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='profilePicture' className={styles.chooseFileBtn}>Upload Image</label>
                {image && <p className={styles.fileName}>{image.name}</p>}
                {error && <p className={styles.fileName}>{error}</p>}
                <input style={{'display': 'none'}} id='profilePicture' type='file' ref={fileRef} onChange={handleFileChosen}/>
            </form>
            {
                imageUrl && 
                <ImageCropper chosenImg={image} imageUrl={imageUrl} dispatch={dispatch}/>
            }
        </div>
    )
}

export default connect((state) => ({
    user: state.user
}))(UploadImage)
