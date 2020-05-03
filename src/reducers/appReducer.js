import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import postReducer from '../reducers/postReducer'
import errorReducer from '../reducers/errorReducer'

const appReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    error: errorReducer
})

const rootReducer = (state, action) => {
    console.log('Type = ', action.type)
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer
