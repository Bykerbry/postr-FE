import React, { Component } from 'react'
import { connect } from 'react-redux'
import getAllPosts from '../services/posts/getAllPosts'

export class FeedPage extends Component {
    componentDidMount() {
        getAllPosts(this.props.dispatch)
    }
    render() {
        return (
            <div>
                <p>Hey {this.props.user.info.firstName}, here is your Postr Feed!</p>
                {
                    this.props.posts.all
                    &&
                    this.props.posts.all.map(post => (
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

export default connect((state) => ({
    user: state.user,
    posts: state.posts
}))(FeedPage)

