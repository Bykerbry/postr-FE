import React, {useState} from 'react'
import Modal from 'react-modal'
import createComment from '../services/comments/createComment.js'
import modalStyles from '../styles/components/Modal.module.scss'
import formStyles from '../styles/components/Forms.module.scss'

const CreateCommentModal = ({postId, isModalOpen, dispatch, handleCloseCreateCommentModal}) => {
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setComment(e.target.value)
        setError('')
    }
    const handleAddComment = () => {
        if (comment) {
            createComment(postId, {comment}, dispatch)
            handleCloseCreateCommentModal()    
        } else {
            setError('Please add a comment.')
        }
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseCreateCommentModal}
            onAfterOpen={() => setError('')}
            className={modalStyles.modal}
            overlayClassName={modalStyles.overlay}
            closeTimeoutMS={250}
        >
            <h2>Add Comment</h2>
            <div className={formStyles.inputContainer}>
                <label htmlFor='body'>Comment</label>
                <textarea
                    cols='30'
                    rows='10'
                    name='body'
                    onChange={handleChange}    
                >
                </textarea>
            </div>
            { error && <p>{error}</p>}
            <button className={formStyles.marginTopBtn} onClick={handleAddComment}>Add Comment</button>
            <span onClick={handleCloseCreateCommentModal} className={`material-icons ${modalStyles.closeModalBtn}`}>close</span>
        </Modal>
    )
}

export default CreateCommentModal
