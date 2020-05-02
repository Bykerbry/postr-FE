

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



export { 
    setAuth, 
    removeAuth,
    setUser
}