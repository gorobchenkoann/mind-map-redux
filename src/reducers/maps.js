const initialState = {};

export function maps(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_WORKSPACE':
        console.log('keki')
            return {
                ...state,
                [action.id]: {
                    nodes: action.nodes,
                    lines: action.lines
                }
            }
        case 'CLEAR_ALL':
            return initialState
        default:
            return state
    }
}