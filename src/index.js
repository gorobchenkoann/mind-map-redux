import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './components';
import { rootReducer } from './redux/reducers';
import './style.scss';

const persistedState = localStorage.getItem('state') 
    ? JSON.parse(localStorage.getItem('state')) 
    : {}

const store = createStore(rootReducer, persistedState);
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('.app')
);