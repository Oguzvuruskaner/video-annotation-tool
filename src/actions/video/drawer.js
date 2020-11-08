export const OPEN_DRAWER  = "open_drawer"
export const CLOSE_DRAWER = "close_drawer"


export const closeDrawer = () => ({
    type:CLOSE_DRAWER
})

export const openDrawer = (id) => ({
    type:OPEN_DRAWER,
    payload:id
})
