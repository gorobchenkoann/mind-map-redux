import Plain from 'slate-plain-serializer';
import {createId} from '../../utils/createId';

const initialState = {}
const NODE_SIZES = {
    width: 280,
    height: 160
}

export function nodes(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_NODE':
            return {                
                ...state, 
                [createId()]: {  
                    sizes: {
                        width: 280,
                        height: 160
                    },
                    position: {
                        x: action.x - NODE_SIZES.width / 2,
                        y: action.y,
                    }, 
                    text: Plain.deserialize(''),  
                    title: 'Node'   
                }                
            }
        case 'EDIT_NODE_TEXT':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    text: action.text
                }
                
            }
        case 'EDIT_NODE_TITLE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    title: action.title
                }
            }
        case 'DRAG_NODE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    position: {
                        x: action.x,
                        y: action.y
                    }
                }                
            }
        case 'RESIZE_NODE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    sizes: {
                        width: action.width,
                        height: action.height
                    }
                }                
            }
        case 'REMOVE_NODE':
            let newState = Object.keys(state)
                .filter(key => key !== action.id)
                .reduce((result, current) => {
                    result[current] = state[current]; 
                    return result
                }, {});
            console.log(newState)
            return newState
        case 'CLEAR_WORKSPACE':
            return initialState  
        case 'SET_CURRENT_MAP':
            console.log(state)    
        default:
            return state
    }
    
}