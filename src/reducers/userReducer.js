
const defaultUser = {
    authToken: '',
    info: null
}

const userReducer = (state = defaultUser, action) => {
    switch(action.type) {
        case 'SET_AUTH':
            if( state.authToken !== action.authToken) {
                return {...state, authToken: action.authToken}
            }
            return state
        case 'SET_USER':
            return {...state, info: action.info}
        default:
            return state
    }
}

export default userReducer
