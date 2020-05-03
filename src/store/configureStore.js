import { createStore, combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import postReducer from '../reducers/postReducer'
import errorReducer from '../reducers/errorReducer'

const configureStore = () => {
    return createStore(
        combineReducers({
            user: userReducer,
            posts: postReducer,
            error: errorReducer
        })
    )
}

export default configureStore