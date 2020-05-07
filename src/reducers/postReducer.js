
const defaultState = {
    user: [],
    all: []
}

const postReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'LOAD_USER_POSTS':
            return {...state, user: [...action.posts]}
        case 'LOAD_ALL_POSTS':
            return {...state, all: [...action.posts]}
        case 'POST_CREATED':
            return {
                ...state, 
                user: [...state.user, action.post], 
                all: [...state.all, action.post]
            }
        case 'POST_UPDATED':
            const updatedUser = state.user.map(post => post._id === action.post._id ? action.post : post)
            const updatedAll = state.all.map(post => post._id === action.post._id ? action.post : post)
            return { ...state, user: updatedUser, all: updatedAll }
        case 'POST_DELETED':
            const user = state.user.filter(post => post._id !== action.id)
            const all = state.all.filter(post => post._id !== action.id)
            return {...state, user, all}
        default:
            return state
    }
}

export default postReducer
