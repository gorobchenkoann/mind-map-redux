import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './components';
import { rootReducer } from './redux/reducers';
import './style.scss';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('.app')
);