export const CREATE_CANVAS = "create_canvas"
export const DELETE_CANVAS = "delete_canvas"
export const PLACE_CANVAS = "place_canvas"

export const SELECT_OBJECT = "select_object"
export const REMOVE_OBJECT = "remove_object"

// Recreating object needs different procedures.
// For instance, sorting state keys.
export const RECREATE_OBJECT = "recreate_object"

export const deleteCanvas = () => ({
    type:DELETE_CANVAS,
    payload:null
})

export const createCanvas = (canvas) => ({
    type:CREATE_CANVAS,
    payload:canvas
})

export const placeCanvas = () => ({
    type:PLACE_CANVAS
})

