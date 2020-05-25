import React, {useState} from 'react'
import ContentFooter from './ContentFooter'
import UpdateCommentModal from './UpdateCommentModal'
import styles from '../styles/components/Comments.module.scss'

const Comments = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {comment, createdAt, creator, votes} = props.comment
    const isUserComment = props.userId === creator._id
    
    const handleOpenModal = () => {
        if (isUserComment) {
            setIsModalOpen(true)
        }
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className={styles.commentContainer}>
            <div className={styles.header}>
                { 
                    creator.profilePicture 
                    ?
                    <img 
                        className={styles.img} 
                        src={`http://localhost:8080/${creator.profilePicture}`} 
                        alt='profile' 
                    />
                    :
                    <img 
                        className={styles.img} 
                        src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' 
                        alt='default profile' 
                    />
                }
                <span>{creator.name} - {props.format(createdAt)}</span>

            </div>
            <p className={styles.comment} onClick={handleOpenModal}>{comment}</p>
            <UpdateCommentModal 
                isModalOpen={isModalOpen}
                commentText={comment}
                commentId={props.commentId}
                handleCloseModal={handleCloseModal}
            />
            <ContentFooter 
                contentId={props.commentId}
                votes={votes} 
                isPost={false}
                isUserContent={isUserComment} 
            />
        </div>
    )
}
// PostFooter to work with both posts and comments -- view is right, needs functionality
export default Comments
