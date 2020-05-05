import React from 'react'
import moment from 'moment'


const Post = (props) => {
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

    return (
        <div style={{border: "1px solid black"}}>
            <p>{props.post.creator.name} - {format(props.post.createdAt)}</p>
            <h3>{props.post.title}</h3>
            <p>{props.post.body}</p>
        </div>
    )
}

export default Post
