
const setAuth = ({ authToken }) => ({
    type: 'SET_AUTH',
    authToken
})

const setUser = ({ info }) => ({
    type: 'SET_USER',
    info
})

const userUpdated = ({ info }) => ({
    type: 'USER_UPDATED',
    info
})


export { 
    setAuth,
    setUser,
    userUpdated
}