import React from 'react'
import styles from '../styles/components/Comments.module.scss'

const Comments = (props) => {
    return (
        <p className={styles.comment}>{props.comment}</p>
    )
}

export default Comments
