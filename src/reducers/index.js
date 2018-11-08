export  const initialState = {
    nodes: {},
    lines: {},        
    currentLine: null
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_NODE':
            return {
                ...state,
                nodes: {
                    ...state.nodes, 
                    [action.id]: {
                        text: action.text,
                        x: action.x,
                        y: action.y                  
                    }
                }                
            }
        default:
            return state
    }
    
}