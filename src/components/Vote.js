import React from 'react'
import upVotePost from '../services/posts/upVotePost'
import downVotePost from '../services/posts/downVotePost'
import styles from '../styles/components/Votes.module.scss'

const Vote = ({id, votes, isUserPost, dispatch}) => {
    const handleUpVote = () => {
        if (!isUserPost) {
            upVotePost(id, dispatch)
        }
    }
    const handleDownVote = () => {
        if (!isUserPost) {
            downVotePost(id, dispatch)
        }
    }
    return (
        <div>
            <div className={styles.voteContainer} onClick={handleUpVote} >
                <span className={`material-icons ${styles.voteIcon}`}>expand_less</span>
                <span>{votes.up}</span>
            </div>
            <div className={styles.voteContainer} onClick={handleDownVote}>
                <span className={`material-icons ${styles.voteIcon}`}>expand_more</span>
                <span>{votes.down}</span>
            </div>
        </div>
    )
}

export default Vote
