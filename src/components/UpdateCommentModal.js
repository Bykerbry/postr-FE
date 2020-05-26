import React, {useState} from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import deleteComment from '../services/comments/deleteComment'
import updateComment from '../services/comments/updateComment'
import formStyles from '../styles/components/Forms.module.scss'
import modalStyles from '../styles/components/Modal.module.scss'


const UpdateCommentModal = ({isModalOpen, commentText, commentId, handleCloseModal, dispatch}) => {
    const [comment, setComment] = useState(commentText)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setError('')
        setComment(e.target.value)
    }
    const handleUpdateComment = () => {
        console.log(comment)
        if (comment) {
            setError('')
            updateComment(commentId, {comment}, dispatch)
            handleCloseModal()
        } else {
            setError('Please include your updates.')
        }
    }
    const handleDeleteComment = () => {
        deleteComment(commentId, dispatch)
        handleCloseModal()
    }
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className={modalStyles.modal}
            overlayClassName={modalStyles.overlay}
            closeTimeoutMS={250}
        >
            <h2>Update Comment</h2>
            <div className={modalStyles.form}>
                <div className={formStyles.inputContainer}>
                    <label htmlFor='body'>Comment</label>
                    <textarea
                        cols='30'
                        rows='10'
                        name='body'
                        value={comment}
                        onChange={handleChange}    
                    >
                    </textarea>
                </div>
                { error && <p>{error}</p>}
                <div className={modalStyles.btnContainer}>
                    <div>
                        <button onClick={handleUpdateComment}>Update</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                    <button className={modalStyles.deleteBtn} onClick={handleDeleteComment}>
                        <span className='material-icons'> delete_forever </span>
                    </button>
                </div>
            </div>
            <span onClick={handleCloseModal} className={`material-icons ${modalStyles.closeModalBtn}`}>close</span>

        </Modal>
    )
}

export default connect(state => ({
    user: state.user
}))(UpdateCommentModal)
