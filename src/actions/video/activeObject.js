export const SET_ACTIVE_OBJECT  = "set_active_object"
export const CLEAR_ACTIVE_OBJECT = "clear_active_object"


export const setActiveObject = (interpolationId) => ({
    type:SET_ACTIVE_OBJECT,
    payload:interpolationId
})

export const clearActiveObject = () => ({
    type:CLEAR_ACTIVE_OBJECT
})
