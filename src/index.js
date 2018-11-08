import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer, initialState } from './reducers';
const store = createStore(rootReducer, initialState)

import './style.scss';

import { App } from './components';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('.app')
);