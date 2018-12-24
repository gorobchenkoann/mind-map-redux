import { combineReducers } from 'redux';
import { nodes } from './nodes';
import { lines } from './lines';
import { maps } from './maps';

let initialState = null;

function currentMap(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_MAP':
            return action.id
        case 'CLEAR_WORKSPACE':
            return null  
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    nodes,
    lines,
    maps,
    currentMap
})