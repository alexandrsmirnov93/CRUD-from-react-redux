import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import './index.css';
import thunk from 'redux-thunk';//На случай, если данные из json будут приходить из сервера
import 'bootstrap/dist/css/bootstrap.css';
const store = createStore(rootReducers, applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();