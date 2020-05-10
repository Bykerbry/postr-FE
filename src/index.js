import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import checkAuth from './utils/checkAuth'

const store = configureStore()
store.subscribe( () => console.log(store.getState()))

checkAuth(store)

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

/* 
TO DO:
  0. Handle Errors -- User Feedback
  1. Testing
  2. Remove Posts
  3. Edit Posts
  4. Vote Posts
  5. Add Comments
  6. Edit Comments
  7. Delete Comments
  8. Vote Comments
  9. Profile Picture
  10. Posts support multimedia
  11. Style
  12. Deployment Builds
*/
