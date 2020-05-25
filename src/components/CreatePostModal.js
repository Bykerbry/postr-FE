import React, { useState } from 'react'
import Modal from "react-modal";
import styles from '../styles/components/CreatePostModal.module.scss'
import formStyles from '../styles/components/Forms.module.scss'


Modal.setAppElement("#root");

const CreatePostModal = (props) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title || body) {
            props.handleCreatePost()
        } else {
            setError('Please include the content you wish to post.')
        }
    }
    const handleChangeTitle = (e) => {
        setError('')
        setTitle(e.target.value)
    }
    const handleChangeBody = (e) => {
        setError('')
        setBody(e.target.value)
    }
    const handleRequestClose = () => {
        setError('')
        props.handleCancelCreatePost()
    }
    return (
        <Modal
            isOpen={props.isModalOpen}
            onRequestClose={handleRequestClose}
            contentLabel='Create Post Form'
            className={styles.modal}
            overlayClassName={styles.overlay}
            closeTimeoutMS={250}
        >
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={formStyles.inputContainer}>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text' 
                        name='title' 
                        onChange={handleChangeTitle}    
                    />
                </div>
                <div className={formStyles.inputContainer}>
                    <label htmlFor='body'>Content</label>
                    <textarea
                        cols='30'
                        rows='10'
                        name='body'
                        onChange={handleChangeBody}    
                    >
                    </textarea>
                </div>
                {error && <p>{error}</p>}
                <button className={formStyles.centeredBtn}>Add Post</button>
            </form>
            <span onClick={handleRequestClose} className={`material-icons ${styles.closeModalBtn}`}>close</span>
        </Modal>
    )
}


export default CreatePostModal
