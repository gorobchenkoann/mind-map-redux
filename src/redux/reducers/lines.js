import {createId} from '../../utils/createId';
const initialState = JSON.parse(localStorage.getItem('lines')) || {};
// const initialState = {};

export function lines(state = initialState, action) {
    let newState = {};    
    switch (action.type) { 
        case 'CREATE_LINE':
            return {
                ...state,
                [createId()]: {
                    source: action.from,
                    target: action.to,
                    visible: true
                }
            }
        case 'RENDER_LINE':
            return {

            }
        case 'REMOVE_NODE': 
            newState = {};
            newState = Object.keys(state)
                .filter(key => state[key].source.split('-')[0] !== action.id)
                .reduce((result, current) => {
                    result[current] = state[current]; 
                    return result
                }, {});
            return newState

        case 'CLEAR_WORKSPACE':
            newState = Object.assign({}, state); 
            Object.keys(newState).map(id => newState[id].visible = false);
            return newState
        case 'FILTER_VISIBLE': 
            if (action.itemType === 'lines') {
                console.log(action)
                newState = Object.assign({}, state); 
                action.items.map(id => console.log(id))
                console.log(newState)
                action.items.map(id =>  newState[id].visible = true);
                return newState
            } 
            return state
        default:
            return state
    }
    
}