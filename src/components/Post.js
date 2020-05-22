import React, {useState} from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import Vote from './Vote'
import styles from '../styles/components/Post.module.scss'
import UpdatePostModal from './UpdatePostModal'


const Post = ({ post, user, dispatch }) => {
    const isUserPost = post.creator._id === user.info._id
    const [ isModalOpen, setIsModalOpen ] = useState(false)

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

    const handleOpenModal = () => {
        if (isUserPost) {
            setIsModalOpen(true)
        } 
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
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
                handleCloseModal={handleCloseModal}
                title={post.title}
                body={post.body}
                postId={post._id}
                isModalOpen={isModalOpen}
            />
            <div>
                <div className={styles.postContent}>
                    <h3 onClick={handleOpenModal}>{post.title}</h3>
                    <p onClick={handleOpenModal}>{post.body}</p>
                </div>
                <div>
                    <Vote 
                        postId={post._id}
                        userId={user.info._id} 
                        votes={post.votes} 
                        isUserPost={isUserPost} 
                        dispatch={dispatch}/>
                </div>
            </div>
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
