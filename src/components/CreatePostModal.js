import React, { Component } from 'react'
import Modal from "react-modal";
import styles from '../styles/components/CreatePostModal.module.scss'
import formStyles from '../styles/components/Forms.module.scss'


Modal.setAppElement("#root");

export class CreatePostModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                onRequestClose={this.props.handleCancelCreatePost}
                contentLabel='Create Post Form'
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>Create Post</h2>
                <form onSubmit={this.props.handleCreatePost} className={styles.form}>
                    <div className={formStyles.inputContainer}>
                        <label htmlFor='title'>Title</label>
                        <input 
                            type='text' 
                            name='title' 
                            onChange={this.handleChange}    
                        />
                    </div>
                    <div className={formStyles.inputContainer}>
                        <label htmlFor='body'>Content</label>
                        <textarea
                            cols='30'
                            rows='10'
                            name='body'
                            onChange={this.handleChange}    
                        >
                        </textarea>
                    </div>
                    <button className={formStyles.centeredBtn}>Add Post</button>
                </form>
                <span onClick={this.props.handleCancelCreatePost} className={`material-icons ${styles.closeModalBtn}`}>close</span>
            </Modal>
        )
    }
}

export default CreatePostModal
