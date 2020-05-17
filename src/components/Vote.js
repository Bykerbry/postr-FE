import React from 'react'
import upVotePost from '../services/posts/upVotePost'
import downVotePost from '../services/posts/downVotePost'
import styles from '../styles/components/Votes.module.scss'

const Vote = ({postId, userId, votes, isUserPost, dispatch}) => {

    const hasPreviouslyUpVoted = votes.up.voters.find(voter => voter._id === userId)
    const hasPreviouslyDownVoted = votes.down.voters.find(voter => voter._id === userId)
    const hasPreviouslyVoted = !!hasPreviouslyUpVoted || !!hasPreviouslyDownVoted

    const handleUpVote = () => {
        if (!isUserPost && !hasPreviouslyVoted) {
            upVotePost(postId, dispatch)
        }
    }
    const handleDownVote = () => {
        if (!isUserPost && !hasPreviouslyVoted) {
            downVotePost(postId, dispatch)
        }
    }
    return (
        <div>
            <div className={styles.voteContainer} onClick={handleUpVote} >
                <span className={`material-icons ${styles.voteIcon} ${hasPreviouslyUpVoted && styles.hasVotedIcon}`}>expand_less</span>
                <span>{votes.up.count}</span>
            </div>
            <div className={styles.voteContainer} onClick={handleDownVote}>
                <span className={`material-icons ${styles.voteIcon} ${hasPreviouslyDownVoted && styles.hasVotedIcon}`}>expand_more</span>
                <span>{votes.down.count}</span>
            </div>
        </div>
    )
}

export default Vote
