import React, {useState} from 'react'
import moment from 'moment'
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import { connect } from 'react-redux'
import styles from '../styles/components/Post.module.scss'
import formStyles from '../styles/components/Forms.module.scss'


const Post = ({ post, user, dispatch }) => {
    const isUserPost = post.creator._id === user.info._id
    const [ title, setTitle ] = useState(post.title)
    const [ body, setBody ] = useState(post.body)
    const [ editing, setEditing ] = useState(false)
    const [ titleBeforeEdit, setTitleBeforeEdit ] = useState(post.title)
    const [ bodyBeforeEdit, setBodyBeforeEdit ] = useState(post.body)

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
    const handleDeleteClick = () => {
        deletePost(post._id, dispatch)
    }
    const handleEditing = () => {
        if (isUserPost) {
            setTitleBeforeEdit(title)
            setBodyBeforeEdit(body)
            setEditing(true)
        } 
    }
    // const handleUpdateTitle = () => {
    //     updatePost(post._id, {title}, dispatch)
    //     setEditing(false)
    // }
    const handleUpdate = () => {
        updatePost(post._id, {title, body}, dispatch)
        setEditing(false)
    }
    const handleDontUpdateTitle = () => {
        setTitle(titleBeforeEdit)
        setBody(bodyBeforeEdit)
        setEditing(false)
    }

    return (
        <div className={styles.container}>
            <div className='header'>
                {post.creator.profilePicture ? (
                    <div className={styles.imgContainer}> 
                        <img className={styles.img} src={`http://localhost:8080/${post.creator.profilePicture}`} alt='profile'/>
                    </div>
                ) : (
                    <div className={styles.imgContainer}> 
                        <img className={styles.img} src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' alt='default profile' />
                    </div>

                )}
                <span>{post.creator.name} - {format(post.createdAt)}</span>
            </div>
            {
                editing
                ?
                <div>
                    <div>
                        <input 
                            type='text'
                            name='title'
                            value={title}
                            className={formStyles.input}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type='text'
                            name='title'
                            value={body}
                            className={formStyles.input}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                </div>
                :
                <div className={styles.postContent}>
                    <h3 onClick={handleEditing}>{post.title}</h3>
                    <p onClick={handleEditing}>{post.body}</p>
                </div>
            }
            {
                isUserPost && editing &&                 
                    <div className={styles.btnContainer}>
                        <button className={styles.updateBtn} onClick={handleUpdate}>
                            Update
                        </button>
                        <button onClick={handleDontUpdateTitle}>
                            Cancel
                        </button>
                        <button onClick={handleDeleteClick} className={styles.deleteBtn}>
                            <span className="material-icons" id={styles.deleteIcon}> 
                                delete_forever
                            </span>
                        </button>
                    </div>
            }
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
