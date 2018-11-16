import Plain from 'slate-plain-serializer';

let createId = () => (
    Math.random().toString(36).substr(2, 9)
)

const initialState = {}

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
                        x: action.x - 140,
                        y: action.y - 70,
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
        case 'CLEAR_WORKSPACE':
            return initialState        
        default:
            return state
    }
    
}