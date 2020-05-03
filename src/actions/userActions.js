

const setAuth = ({ authToken }) => ({
    type: 'SET_AUTH',
    authToken
})

const removeAuth = () => ({
    type: 'REMOVE_AUTH'
})

const setUser = ({ info }) => ({
    type: 'SET_USER',
    info
})

const removeUser = () => ({
    type: 'REMOVE_USER'
})



export { 
    setAuth, 
    removeAuth,
    setUser,
    removeUser
}