import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import getAllPosts from '../services/posts/getAllPosts'
import styles from '../styles/components/FeedPage.module.scss'


export class FeedPage extends Component {

    componentDidMount() {
        getAllPosts(this.props.dispatch)
    }

    render() {
        return (
            <div>
                <h1 className={styles.pageTitle}>Postr Feed</h1>
                <p className={styles.msg}>Hey {this.props.user.info.firstName}, here is your Postr Feed!</p>
                {
                    this.props.posts.all
                    &&
                    this.props.posts.all.reverse().map(post => (
                        <Post post={post} key={post._id} />
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

