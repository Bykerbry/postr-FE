import { createStore, combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import errorReducer from '../reducers/errorReducer'

const configureStore = () => {
    return createStore(
        combineReducers({
            user: userReducer,
            error: errorReducer
        })
    )
}

export default configureStore