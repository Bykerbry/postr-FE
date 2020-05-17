import React from 'react'
import votePost from '../services/posts/votePost'
import styles from '../styles/components/Votes.module.scss'

const Vote = ({postId, userId, votes, isUserPost, dispatch}) => {

    const hasPreviouslyUpVoted = votes.up.voters.find(voter => voter._id === userId)
    const hasPreviouslyDownVoted = votes.down.voters.find(voter => voter._id === userId)
    const hasPreviouslyVoted = !!hasPreviouslyUpVoted || !!hasPreviouslyDownVoted

    const handleUpVote = () => {
        if (!isUserPost && !hasPreviouslyVoted) {
            votePost('cast', 'up', postId, dispatch)
        } else if (!isUserPost && hasPreviouslyUpVoted) {
            votePost('remove', 'up', postId, dispatch)
        }
    }
    const handleDownVote = () => {
        if (!isUserPost && !hasPreviouslyVoted) {
            votePost('cast','down', postId, dispatch)
        } else if (!isUserPost && hasPreviouslyDownVoted) {
            votePost('remove','down', postId, dispatch)
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
