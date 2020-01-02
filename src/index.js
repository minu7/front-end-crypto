import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './AppState/Reducer';
import dependencies from './Dependencies';
import Router from './router.component';

import * as serviceWorker from './serviceWorker';


const persistConfig = {
  key: 'root',
  storage,
};
const pReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  pReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(dependencies)),
    // other store enhancers if any
  ),
);
const persistor = persistStore(store);

const routerRender = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
);

ReactDOM.render(routerRender(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
