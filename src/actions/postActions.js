
const loadUserPosts = (posts) => ({
    type: 'LOAD_USER_POSTS',
    posts
})

const loadAllPosts = (posts) => ({
    type: 'LOAD_ALL_POSTS',
    posts
})

export {
    loadUserPosts,
    loadAllPosts
}