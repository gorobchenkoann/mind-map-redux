import { combineReducers } from 'redux';
import { nodes } from './nodes';
import { lines } from './lines';
import { maps } from './maps';

export const rootReducer = combineReducers({
    nodes,
    lines,
    maps
})