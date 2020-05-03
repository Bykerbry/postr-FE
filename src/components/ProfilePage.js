import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ProfilePage extends Component {  
    render() {
        return (
            <div>
                <p>Welcome {this.props.user.info.firstName}!</p>
                {
                    this.props.posts.user
                    &&
                    this.props.posts.user.map(post => (
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
