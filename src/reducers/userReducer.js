
const defaultUser = {
    authToken: ''
}

const userReducer = (state = defaultUser, action) => {
    switch(action.type) {
        case 'SET_AUTH':
            if( state.authToken !== action.authToken) {
                return {...state, authToken: action.authToken}
            }
            return state
        case 'REMOVE_AUTH':
            return {...state, authToken: ''}
        default:
            return state
    }
}

export default userReducer