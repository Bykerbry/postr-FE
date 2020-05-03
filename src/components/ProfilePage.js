import React, { Component } from 'react'
import { connect } from 'react-redux'
import readPosts from '../services/posts/loadUserPosts'

export class ProfilePage extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <p>Welcome {this.props.user.info.firstName}!</p>
                <button onClick={() => readPosts(this.props)}>See Posts</button>
                {
                    this.props.posts.length 
                    &&
                    this.props.posts.map(post => (
                        <div key={post._id}>
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
