import { combineReducers } from 'redux';
import { nodes } from './nodes';
import { lines } from './lines';
import { maps } from './maps';

function currentMap(state = null, action) {
    switch (action.type) {
        case 'SET_CURRENT_MAP':
            return action.id
        case 'CLEAR_WORKSPACE':
            return null  
        case 'CLEAR_ALL':
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