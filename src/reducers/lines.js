let createId = () => (
    Math.random().toString(36).substr(2, 9)
)

const initialState = {}

export function lines(state = initialState, action) {
    switch (action.type) {        
        case 'CREATE_LINE':
        console.log('line')
            return {               
                ...state,
                [createId()]: {
                    from: action.from,
                    to: action.to
                }                
            }
        case 'RENDER_LINE':
            return {

            }
        case 'CLEAR_WORKSPACE':
            return initialState
        default:
            return state
    }
    
}