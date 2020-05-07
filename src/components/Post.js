import React, {useState} from 'react'
import moment from 'moment'
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import { connect } from 'react-redux'


const Post = ({ post, user, dispatch }) => {
    const isUserPost = post.creator._id === user.info._id
    const [ title, setTitle ] = useState(post.title)
    const [ body, setBody ] = useState(post.body)
    const [ editingTitle, setEditingTitle ] = useState(false)
    const [ editingBody, setEditingBody ] = useState(false)


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
    const handleEditingTitle = () => {
        if (isUserPost) {
            setEditingTitle(true)
        } 
    }
    const handleEditingBody = () => {
        if (isUserPost) {
            setEditingBody(true)
        }
    }
    const handleUpdateTitle = () => {
        updatePost(post._id, {title}, dispatch)
        setEditingTitle(false)
    }
    const handleUpdateBody = () => {
        updatePost(post._id, {body}, dispatch)
        setEditingBody(false)
    }

    return (
        <div style={{border: "1px solid black"}}>
            <p>{post.creator.name} - {format(post.createdAt)}</p>
            {
                editingTitle
                ?
                <div>
                    <input 
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setTitle(e.target.value)
                            console.log(title)
                        }}
                    />
                    <button onClick={handleUpdateTitle}>Update Title</button>
                </div>
                :
                <h3 onClick={handleEditingTitle}>{post.title}</h3>
            }
            {
                editingBody
                ?
                <div>
                    <input
                        type='text'
                        name='title'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <button onClick={handleUpdateBody}>Update Comment</button>
                </div>
                :
                <p onClick={handleEditingBody}>{post.body}</p>

            }
            {   
                isUserPost && 
                <div>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
            }
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
