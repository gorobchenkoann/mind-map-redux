const initialState = JSON.parse(localStorage.getItem('maps')) || {};

export function maps(state = initialState, action) {
    switch (action.type) {  
        case 'SAVE_WORKSPACE':
        // add localstorage here
            return {
                ...state,
                [action.id]: {
                    nodes: action.nodes,
                    lines: action.lines
                }
            }
        case 'REMOVE_CURRENT_MAP':
             let newState = Object.keys(state)
                .filter(id => id !== action.id)
                .reduce((result, current) => {
                    result[current] = state[current];
                    return result
                }, {})
            return newState
        case 'CLEAR_ALL':
            return {}
        default:
            return state
    }
}