
const setAuth = ({ authToken }) => ({
    type: 'SET_AUTH',
    authToken
})

const removeAuth = () => ({
    type: 'REMOVE_AUTH'
})

export { 
    setAuth, 
    removeAuth
}