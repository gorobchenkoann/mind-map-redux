let createId = () => (
    Math.random().toString(36).substr(2, 9)
)

export function lines(state = {}, action) {
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
        default:
            return state
    }
    
}