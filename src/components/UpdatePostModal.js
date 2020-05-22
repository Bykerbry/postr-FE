import React, { useState } from 'react'
import Modal from "react-modal";
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import styles from '../styles/components/UpdatePostModal.module.scss'
import modalStyles from '../styles/components/CreatePostModal.module.scss'
import formStyles from '../styles/components/Forms.module.scss'


const UpdatePostModal = (props) => {
    const {postId, dispatch} = props
    const [title, setTitle] = useState(props.title)
    const [body, setBody] = useState(props.body)

    const handleUpdatePost = () => {
        updatePost(postId, {title, body}, dispatch)
        props.handleCloseModal()
    }
    const handleDeletePost = () => {
        deletePost(postId, dispatch)
        props.handleCloseModal()
    }
    const handleCancelUpdate = () => {
        setTitle(props.title)
        setBody(props.body)
        props.handleCloseModal()
    }

    return (
        <Modal
            isOpen={props.isModalOpen}
            onRequestClose={props.handleDontUpdate}
            className={modalStyles.modal}
            overlayClassName={modalStyles.overlay}
            closeTimeoutMS={250}
        >
            <h2>Update Post</h2>
            <div onSubmit={props.handleUpdate} className={modalStyles.form}>
                <div className={formStyles.inputContainer}>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text' 
                        name='title' 
                        value={title}
                        className={formStyles.input}
                        onChange={(e) => setTitle(e.target.value) }    
                    />
                </div>
                <div className={formStyles.inputContainer}>
                    <label htmlFor='body'>Content</label>
                    <textarea
                        cols='30'
                        rows='10'
                        name='body'
                        value={body}
                        className={formStyles.input}
                        onChange={(e) => setBody(e.target.value)}    
                    >
                    </textarea>
                </div>
                <div className={styles.btnContainer}>
                    <div className={styles.btnLeft}>
                        <button onClick={handleUpdatePost}> Update </button>
                        <button onClick={handleCancelUpdate}> Cancel </button>
                    </div>
                    <button className={styles.deleteBtn} onClick={handleDeletePost}>
                        <span className="material-icons" id={styles.deleteIcon}> delete_forever </span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default UpdatePostModal
