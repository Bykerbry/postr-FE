import React, { useRef } from 'react'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import styles from '../styles/components/ImageCropper.module.scss'

class ImageCropper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            croppedImg: null
        }
        this.imgContainer = React.createRef()
        this.imgRef = React.createRef()
    }
    componentDidMount() {
        const cropper = new Cropper(this.imgRef.current, {
            aspectRatio: 1,
            viewMode: 1,
            crop: (event) => {
                console.log('in crop')
                const cropped = cropper.getCroppedCanvas()
                this.setState({croppedImg: cropped})   
            }
        })
        console.log(cropper)
    }
    checkState = () => {
        console.log(this.state)
    }
    render() {
        return (
            <div className={styles.imgContainer} ref={this.imgContainer}>
                <img className={styles.img} ref={this.imgRef} src={`http://localhost:8080/${this.props.profilePicture}`} alt='preview'/>
                <button onClick={this.checkState}>Finish</button>
            </div>
        )
    }
}

export default ImageCropper

