import React from 'react'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import uploadImage from '../services/users/uploadImage'
import styles from '../styles/components/ImageCropper.module.scss'

class ImageCropper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            croppedImg: null,
            croppedImgUrl: ''
        }
        this.imgContainer = React.createRef()
        this.imgRef = React.createRef()
    }
    componentDidMount() {
        const cropper = new Cropper(this.imgRef.current, {
            aspectRatio: 1,
            data: this.props.chosenImg,
            viewMode: 1,
            crop: () => {
                const cropped = cropper.getCroppedCanvas({
                    maxWidth: 4096,
                    maxHeight: 4096,
                    fillColor: '#fff',
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: 'high',
                  })
                this.setState({
                    croppedImg: cropped,
                    croppedImgUrl: cropped.toDataURL()
                }) 
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const cropped = this.state.croppedImg
        cropped.toBlob(blob => {
            const formData = new FormData()
            const extension = blob.type.split('/')[1]
            formData.append('profilePicture', blob, `placeholderFileName.${extension}`)
            const file = formData.get('profilePicture')
            uploadImage(formData, this.props.dispatch)
            console.log(file)
        })
    }
    render() {
        return (
            <form className={styles.imgContainer} ref={this.imgContainer} onSubmit={this.handleSubmit}>
                <img className={styles.img} ref={this.imgRef} alt='preview' src={this.props.imageUrl}/>
                {this.state.croppedImgUrl && <img className={styles.preview} src={this.state.croppedImgUrl} alt='preview' />}
                <button>Make Profile Picture</button>
            </form>
        )
    }
}

export default ImageCropper

