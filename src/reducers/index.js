import { combineReducers } from 'redux';
import { nodes } from './nodes';
import { lines } from './lines';

export const rootReducer = combineReducers({
    nodes,
    lines
})