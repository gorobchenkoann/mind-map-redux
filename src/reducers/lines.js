import {createId} from '../utils/createId';
const initialState = {}

export function lines(state = initialState, action) {
    switch (action.type) {        
        case 'CREATE_LINE':
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