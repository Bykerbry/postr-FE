import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import createPost from '../services/posts/createPost'
import CreatePostModal from './CreatePostModal'
import Post from './Post'
import UploadImage from './UploadImage'
import styles from '../styles/components/ProfilePage.module.scss'



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
                <h1 className={styles.welcome}>Welcome {user.info.firstName}!</h1>
                {
                    user.info.profilePicture 
                    ? 
                    <img className={styles.profilePicture} src={`http://localhost:8080/${user.info.profilePicture}`} alt='profile'/>
                    : 
                    (
                        <div>
                            <img className={styles.profilePicture} src='https://www.sackettwaconia.com/wp-content/uploads/default-profile.png' alt='default profile' />
                            <p className={styles.welcome}>Add a Profile Picture</p>
                            <UploadImage />
                        </div>
                    )
                }
                <div className={styles.updateAndCreate}>
                    <Link className={styles.update} to='/update'>Update Profile</Link>
                    <button className={styles.create} onClick={this.handleClick}>Create Post</button>
                </div>
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
