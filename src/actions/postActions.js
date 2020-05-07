
const loadUserPosts = (posts) => ({
    type: 'LOAD_USER_POSTS',
    posts
})

const loadAllPosts = (posts) => ({
    type: 'LOAD_ALL_POSTS',
    posts
})

const postCreated = (post) => ({
    type: 'POST_CREATED',
    post
})

const postUpdated = (post) => ({
    type: 'POST_UPDATED',
    post
})

const postDeleted = (post) => ({
    type: 'POST_DELETED',
    post
})

export {
    loadUserPosts,
    loadAllPosts,
    postCreated,
    postUpdated,
    postDeleted
}