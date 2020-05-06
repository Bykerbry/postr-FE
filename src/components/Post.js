import React from 'react'
import moment from 'moment'
import deletePost from '../services/posts/deletePost'
import updatePost from '../services/posts/updatePost'
import { connect } from 'react-redux'


const Post = ({ post, user, dispatch }) => {

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
    const handleDeleteClick = () =>{
        deletePost(post._id, dispatch)
    }
    const handleUpdateClick = () =>{
        updatePost(post._id, dispatch)
    }

    return (
        <div style={{border: "1px solid black"}}>
            <p>{post.creator.name} - {format(post.createdAt)}</p>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            { 
                post.creator._id === user.info._id 
                && 
                <div>
                    <button onClick={handleDeleteClick}>Delete</button> 
                    <button onClick={handleUpdateClick}>Update</button>
                </div>
            }
        </div>
    )
}


export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(Post)
