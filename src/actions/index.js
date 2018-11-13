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

export const createLine = (from, to) => ({
    type: 'CREATE_LINE',
    from,
    to
})