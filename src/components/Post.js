import React, {useState} from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import Comment from './Comment'
import UpdatePostModal from './UpdatePostModal'
import CreateCommentModal from './CreateCommentModal'
import ContentFooter from './ContentFooter'
import styles from '../styles/components/Post.module.scss'


const Post = ({ post, user, dispatch }) => {
    const isUserPost = post.creator._id === user.info._id
    const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false)
    const [isCreateCommentModalOpen, setIsCreateCommentModalOpen] = useState(false)
    const [showComments, setShowCommetns] = useState(false)

    const format = (createdAt) => {
        const created    = moment(createdAt)
        const now        = moment()
        const yesterday  = moment().subtract(1, 'days')
        const sixDaysAgo = moment().subtract(6, 'days')

        if (moment(created).isAfter(moment(now).startOf('day'))) {
            return moment(created).format('[Today] h:mm a')
        } else if (moment(created).isBetween(moment(yesterday).startOf('day'), moment(yesterday).endOf('day'))) {
            return (moment(created).format('[Yesterday] h:mm a'))
        } else if (moment(created).isAfter(moment(sixDaysAgo))) {
            return moment(created).format('dddd h:mm a')
        }
        return created.format('ddd, MMM D, h:mm a')
    }

    const handleOpenUpdatePostModal = () => {
        if (isUserPost) {
            setIsUpdatePostModalOpen(true)
        } 
    }
    const handleCloseUpdatePostModal = () => {
        setIsUpdatePostModalOpen(false)
    }
    const handleShowComments = () => {
        showComments ? setShowCommetns(false) : setShowCommetns(true)
    }
    const handleOpenCreateCommentModal = () => {
        setIsCreateCommentModalOpen(true)
    }
    const handleCloseCreateCommentModal = () => {
        setIsCreateCommentModalOpen(false)
    }

    return (
        <div className={styles.container}>
            <div className='header'>
                {post.creator.profilePicture ? (
                    <div className={styles.imgContainer}> 
                        <img 
                            className={styles.img} 
                            src={`http://localhost:8080/${post.creator.profilePicture}`} 
                            alt='profile'
                        />
                    </div>
                ) : (
                    <div className={styles.imgContainer}> 
                        <img 
                            className={styles.img} 
                            src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' 
                            alt='default profile' 
                        />
                    </div>
                )}
                <span>{post.creator.name} - {format(post.createdAt)}</span>
            </div>

            <UpdatePostModal 
                dispatch={dispatch}
                handleCloseModal={handleCloseUpdatePostModal}
                title={post.title}
                body={post.body}
                postId={post._id}
                isModalOpen={isUpdatePostModalOpen}
            />
            <div>
                <div className={styles.postContent}>
                    <h3 onClick={handleOpenUpdatePostModal}>{post.title}</h3>
                    <p onClick={handleOpenUpdatePostModal}>{post.body}</p>
                </div>
                <div className={styles.postFooterContainer}>
                    <ContentFooter 
                        contentId={post._id}
                        votes={post.votes} 
                        comments={post.comments.length}
                        isPost={true}
                        isUserContent={isUserPost} 
                        handleShowComments={handleShowComments}
                    />
                </div>
                {
                    showComments &&
                    <div>
                        {
                            post.comments.map(comment => {
                                return <Comment 
                                            key={comment._id}
                                            commentId={comment._id}
                                            userId={user.info._id}
                                            dispatch={dispatch}
                                            comment={comment}
                                            format={format}
                                        />
                            })                          
                        }
                        <button 
                            className={styles.addCommentBtn} 
                            onClick={handleOpenCreateCommentModal}
                        >
                            Add Comment
                        </button>
                        <CreateCommentModal 
                            postId={post._id}
                            isModalOpen={isCreateCommentModalOpen}
                            dispatch={dispatch}
                            handleCloseCreateCommentModal={handleCloseCreateCommentModal}
                        />
                    </div>
                }
            </div>
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
