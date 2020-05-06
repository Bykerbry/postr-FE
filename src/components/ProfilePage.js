import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import createPost from '../services/posts/createPost'
import Post from './Post'

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
        return (
            <div>
                <p>Welcome {this.props.user.info.firstName}!</p>
                <button onClick={this.handleClick}>Create Post</button>
                <CreatePostModal
                    handleCreatePost={this.handleCreatePost}
                    isModalOpen={this.state.isModalOpen}
                />
                {
                    this.props.posts.user
                    &&
                    this.props.posts.user.reverse().map(post => (
                        <Post post={post} user={this.props.user} key={post._id}/>
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
