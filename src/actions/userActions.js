
const setAuth = ({ authToken }) => ({
    type: 'SET_AUTH',
    authToken
})

const setUser = ({ info }) => ({
    type: 'SET_USER',
    info
})


export { 
    setAuth,
    setUser
}