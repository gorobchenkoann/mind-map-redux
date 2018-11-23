const initialState = JSON.parse(localStorage.getItem('maps')) || {};

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
        case 'CLEAR_ALL':
            return {}
        default:
            return state
    }
}