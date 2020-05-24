import React from 'react'
import votePost from '../services/posts/votePost'
import voteComment from '../services/comments/voteComment'
import styles from '../styles/components/PostFooter.module.scss'
import { connect } from 'react-redux'

const ContentFooter = ({contentId, votes, comments, isPost, isUserContent, handleShowComments, user, dispatch}) => {

    const hasPreviouslyUpVoted = votes.up.voters.find(voter => voter._id === user.info._id)
    const hasPreviouslyDownVoted = votes.down.voters.find(voter => voter._id === user.info._id)
    const hasPreviouslyVoted = !!hasPreviouslyUpVoted || !!hasPreviouslyDownVoted

    const handleUpVote = () => {
        if (!isUserContent) {
            if (!hasPreviouslyVoted) {
                isPost ? votePost('cast', 'up', contentId, dispatch) 
                    : voteComment('cast', 'up', contentId, dispatch)
            } else if (hasPreviouslyUpVoted) {
                isPost ? votePost('remove', 'up', contentId, dispatch) 
                    : voteComment('remove', 'up', contentId, dispatch)
            } 
        }
    }
    const handleDownVote = () => {
        if (!isUserContent) {
            if (!hasPreviouslyVoted) {
                isPost ? votePost('cast', 'down', contentId, dispatch) 
                    : voteComment('cast', 'down', contentId, dispatch)
            } else if (hasPreviouslyDownVoted) {
                isPost ? votePost('remove', 'down', contentId, dispatch) 
                    : voteComment('remove', 'down', contentId, dispatch)
            } 
        }
    }
    return (
        <div className={styles.componentContainer}>
            <div className={styles.voteContainer} onClick={handleUpVote} >
                <span className={`material-icons ${styles.voteIcon} ${hasPreviouslyUpVoted && styles.hasVotedIcon}`}>expand_less</span>
                <span>{votes.up.count}</span>
            </div>
            <div className={styles.voteContainer} onClick={handleDownVote}>
                <span className={`material-icons ${styles.voteIcon} ${hasPreviouslyDownVoted && styles.hasVotedIcon}`}>expand_more</span>
                <span>{votes.down.count}</span>
            </div>
            {
                isPost &&
                <div className={styles.voteContainer} onClick={handleShowComments}>
                    <span className="material-icons">chat</span>
                    <span className={styles.commentCount}>{comments}</span>
                </div>
            }
        </div>
    )
}

export default connect((state) => ({
    user: state.user
}))(ContentFooter)

