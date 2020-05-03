import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios'
import * as jwt from 'jwt-decode'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import { removeAuth, removeUser } from './actions/userActions';
import readUser from './services/users/readUser'

const store = configureStore()
store.subscribe( () => console.log(store.getState()))

if (localStorage.authToken) {
  const token = localStorage.authToken
  const decoded = jwt(token)
  const now = Date.now() / 1000
  if ( now > decoded.exp) {
    store.dispatch(removeAuth())
    store.dispatch(removeUser())
    localStorage.removeItem('authToken')
    delete axios.defaults.headers.common['Authorization']
    window.location.href = './login'
  } else {
    readUser(token, store)
  }
} 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
