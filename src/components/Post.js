import React, {useState} from 'react'
import moment from 'moment'
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import { connect } from 'react-redux'


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
    const handleUpdateTitle = () => {
        updatePost(post._id, {title}, dispatch)
        setEditing(false)
    }
    const handleUpdateBody = () => {
        updatePost(post._id, {body}, dispatch)
        setEditing(false)
    }
    const handleDontUpdateTitle = () => {
        setTitle(titleBeforeEdit)
        setBody(bodyBeforeEdit)
        setEditing(false)
    }

    return (
        <div style={{border: "1px solid black"}}>
            {post.creator.profilePicture ? (
                <img style={{maxHeight: '50px', borderRadius: '50%'}} src={`http://localhost:8080/${post.creator.profilePicture}`} alt='profile'/>
            ) : (
                <img style={{maxHeight: '50px', borderRadius: '50%'}} src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' alt='default profile' />

            )}
            <span>{post.creator.name} - {format(post.createdAt)}</span>
            {
                editing
                ?
                <div>
                    <div>
                        <input 
                            type='text'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button onClick={handleUpdateTitle}>
                            Update Title
                        </button>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='title'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <button onClick={handleUpdateBody}>
                            Update Comment
                        </button>
                    </div>
                </div>
                :
                <div>
                    <h3 onClick={handleEditing}>{post.title}</h3>
                    <p onClick={handleEditing}>{post.body}</p>
                </div>
            }
            {
                isUserPost && 
                <div>
                    <button onClick={handleDeleteClick}>
                        Delete
                    </button>
                    {
                        editing && 
                        <button onClick={handleDontUpdateTitle}>
                            Don't Update
                        </button>
                    }
                </div>
            }
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
