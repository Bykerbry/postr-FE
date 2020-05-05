import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import createPost from '../services/posts/createPost'

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
                    this.props.posts.user.map(post => (
                        <div style={{border: "1px solid black"}} key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
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
