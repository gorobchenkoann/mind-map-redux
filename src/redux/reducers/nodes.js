import Plain from 'slate-plain-serializer';
import {createId} from '../../utils/createId';

const initialState = {};
const NODE_SIZES = {
    width: 280,
    height: 160,
    headerHeight: 40
};

export function nodes(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case 'CREATE_NODE':
            return {                
                ...state, 
                [createId()]: {  
                    sizes: {
                        width: NODE_SIZES.width,
                        height: NODE_SIZES.height
                    },
                    position: {
                        x: action.x - NODE_SIZES.width / 2,
                        y: action.y,
                    }, 
                    text: Plain.deserialize(''),  
                    title: 'Node',
                    visible: true  
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
        case 'SHOW_NODE_EDITOR':
            let newNode = {...state};
            if (action.status === 'close') {
                newNode[action.id].sizes.height = NODE_SIZES.headerHeight
            } 
            if (action.status === 'open') {
                newNode[action.id].sizes.height = NODE_SIZES.height
            }
                return newNode
        case 'REMOVE_NODE':
            newState = {};
            newState = Object.keys(state)
                .filter(key => key !== action.id)
                .reduce((result, current) => {
                    result[current] = state[current]; 
                    return result
                }, {});
            return newState
        case 'CLEAR_WORKSPACE':
            newState = Object.assign({}, state); 
            Object.keys(newState).map(id => newState[id].visible = false);
            return newState
        case 'FILTER_VISIBLE':
            if (action.itemType === 'nodes') {
                newState = Object.assign({}, state); 
                action.items.map(id => newState[id].visible = true);
                return newState
            } 
            return state        
            
        default:
            return state
    }
    
}