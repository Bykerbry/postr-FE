import React, {useState} from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import Vote from './Vote'
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import styles from '../styles/components/Post.module.scss'
import UpdatePostModal from './UpdatePostModal'


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

    const handleEditing = () => {
        if (isUserPost) {
            setTitleBeforeEdit(title)
            setBodyBeforeEdit(body)
            setEditing(true)
        } 
    }
    const handleUpdate = () => {

        updatePost(post._id, {title, body}, dispatch)
        setEditing(false)
    }
    const handleDontUpdate = () => {
        setTitle(titleBeforeEdit)
        setBody(bodyBeforeEdit)
        setEditing(false)
    }
    const handleDelete = () => {
        deletePost(post._id, dispatch)
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

            <UpdatePostModal 
                handleUpdate={handleUpdate}
                handleDontUpdate={handleDontUpdate}
                handleDelete={handleDelete}
                title={post.title}
                body={post.body}
                isModalOpen={editing}
            />
            <div>
                <div className={styles.postContent}>
                    <h3 onClick={handleEditing}>{post.title}</h3>
                    <p onClick={handleEditing}>{post.body}</p>
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
            {
                isUserPost && editing &&                 
                    <div className={styles.btnContainer}>
                        <button className={styles.updateBtn} onClick={handleUpdate}>
                            Update
                        </button>
                        <button onClick={handleDontUpdate}>
                            Cancel
                        </button>
                        <button onClick={handleDelete} className={styles.deleteBtn}>
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



/*
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

*/ 