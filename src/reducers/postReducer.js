
const defaultState = {
    user: [],
    all: []
}

const postReducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'POST_CREATED':
            return {
                ...state, 
                user: [...state.user, action.post], 
                all: [...state.all, action.post]
            }
        case 'LOAD_USER_POSTS':
            return {...state, user: [...action.posts]}
        case 'LOAD_ALL_POSTS':
            return {...state, all: [...action.posts]}
        case 'POST_DELETED':
            const user = state.user.filter(post => post._id !== action.id)
            const all = state.all.filter(post => post._id !== action.id)
            return {...state, user, all}
        default:
            return state
    }
}

export default postReducer
