export const createNode = (x, y) => ({
    type: 'CREATE_NODE',
    x,
    y
})

export const editNodeText = (id, text) => ({
    type: 'EDIT_NODE_TEXT',
    id,
    text
})

export const editNodeTitle = (id, title) => ({
    type: 'EDIT_NODE_TITLE',
    id,
    title
})

export const dragNode = (id, x, y) => ({
    type: 'DRAG_NODE',
    id,
    x,
    y
})

export const resizeNode = (id, width, height) => ({
    type: 'RESIZE_NODE',
    id,
    width,
    height
})

export const showNodeEditor = (id, status) => ({
    type: 'SHOW_NODE_EDITOR',
    id,
    status
})

export const createLine = (from, to) => ({
    type: 'CREATE_LINE',
    from,
    to
}) 

export const clearWorkspace = () => ({
    type: 'CLEAR_WORKSPACE'
})

export const saveWorkspace = (id, nodes, lines) => ({
    type: 'SAVE_WORKSPACE',
    id,
    nodes,
    lines
})

export const editWorkspace = (id, nodes, lines) => ({
    type: 'EDIT_WORKSPACE',
    id,
    nodes,
    lines
})

export const setCurrentMap = (id) =>({
    type: 'SET_CURRENT_MAP',
    id
})

export const removeCurrentMap = (id) =>({
    type: 'REMOVE_CURRENT_MAP',
    id
})

export const removeNode = (currentMap, id) => ({
    type: 'REMOVE_NODE',
    currentMap,
    id
})

export const removeLine = (id) => ({
    type: 'REMOVE_LINE',
    id
})

export const filterVisible = (itemType, items) => ({
    type: 'FILTER_VISIBLE',
    itemType, 
    items
})
