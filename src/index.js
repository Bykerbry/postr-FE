import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as jwt from 'jwt-decode'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import { removeAuth, setAuth } from './actions/userActions';

const store = configureStore()
store.subscribe( () => console.log(store.getState()))

if (localStorage.authToken) {
  const token = localStorage.authToken
  const decoded = jwt(token)
  const now = Date.now() / 1000
  if ( now > decoded.exp) {
    store.dispatch(removeAuth())
    localStorage.removeItem('authToken')
    //function to update database
    window.location.href = './login'
  } else {
    store.dispatch(setAuth({authToken: token}))
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
