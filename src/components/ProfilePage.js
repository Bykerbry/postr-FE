import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import createPost from '../services/posts/createPost'
import Post from './Post'
import { Link } from 'react-router-dom'

export class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false 
        }
    }
    handleClick = () => {
        this.setState({isModalOpen: true})
    }
    handleCreatePost = (e) => {
        e.preventDefault()
        const postData = {
            title: e.target.title.value,
            body: e.target.body.value
        }
        createPost(this.props, postData)
        this.setState({isModalOpen: false})
    }
    render() {
        const { user, posts } = this.props
        return (
            <div>
                <h1>Welcome {user.info.firstName}!</h1>
                {user.info.profilePicture ? (
                    <img style={{maxHeight: '100px'}} src={`http://localhost:8080/${user.info.profilePicture}`} alt='profile'/>
                ) : (
                    <div>
                        <img style={{maxHeight: '100px'}} src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' alt='default profile' />
                        <button>Add Profile Picture</button>
                    </div>
                )}
                <Link to='/update'>Update Profile</Link>
                <button onClick={this.handleClick}>Create Post</button>
                <CreatePostModal
                    handleCreatePost={this.handleCreatePost}
                    isModalOpen={this.state.isModalOpen}
                />
                {
                    posts.user
                    &&
                    posts.user.reverse().map(post => (
                        <Post post={post} user={user} key={post._id}/>
                    ))
                }
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user,
    posts: state.posts
}))(ProfilePage)
