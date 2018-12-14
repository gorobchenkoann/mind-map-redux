const initialState = {};
export function maps(state = initialState, action) {
    switch (action.type) {  
        case 'SAVE_WORKSPACE':
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
        case 'REMOVE_NODE':
            if (action.currentMap) {
                let newNodes = state[action.currentMap].nodes.filter(id => id != action.id);
                return {
                    ...state,
                    [action.currentMap]: {
                        ...state[action.currentMap],
                        nodes: newNodes
                    }
                }
            } else {
                return state
        }            
        case 'CLEAR_ALL':
            return {}
        default:
            return state
    }
}