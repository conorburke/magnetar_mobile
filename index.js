// require('dotenv').config();
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './src/App';
import reducers from './src/reducers';

const composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  reducers,
  composeEnhancers(),
  applyMiddleware(reduxThunk)
);

const provider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('seker', () => provider);
