import { createStore } from 'redux'
import rootReducer from '../reducers/appReducer'

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore
