
const initialState = {}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return action.error
        case 'REMOVE_ERROR':
            return {}
        default:
            return state
    }
}

export default errorReducer
