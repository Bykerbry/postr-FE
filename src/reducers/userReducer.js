
const defaultUser = {
    authToken: ''
}

const userReducer = (state = defaultUser, action) => {
    switch(action.type) {
        case 'SET_AUTH':
            return {authToken: action.authToken}
        case 'REMOVE_AUTH':
            return {authToken: ''}
        default:
            return state
    }
}

export default userReducer