import React, { Component } from 'react'
import { connect } from 'react-redux'
import getAllPosts from '../services/posts/getAllPosts'
import moment from 'moment'



export class FeedPage extends Component {
    now = moment()

    componentDidMount() {
        getAllPosts(this.props.dispatch)
    }
    formatCreatedAt = (createdAt) => {
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

    render() {
        return (
            <div>
                <p>Hey {this.props.user.info.firstName}, here is your Postr Feed!</p>
                {
                    this.props.posts.all
                    &&
                    this.props.posts.all.reverse().map(post => (
                        <div style={{border: "1px solid black"}} key={post._id}>
                            <p>{post.creator.name} - {this.formatCreatedAt(post.createdAt)}</p>
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

