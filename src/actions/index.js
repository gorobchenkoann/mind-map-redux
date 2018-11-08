export const createNode = (id, text, x, y) => ({
    type: 'CREATE_NODE',
    id: id,
    text: text,
    x: x,
    y: y
})