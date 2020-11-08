export const CREATE_IMAGE_ANNOTATION = "create_image_annotation"
export const DELETE_IMAGE_ANNOTATION = "create_image_annotation"
export const UPDATE_IMAGE_ANNOTATION = "update_image_annotation"

export const createImageAnnotation = () => (dispatch,getState) => {

    const {imageAnnotation,color} = getState()

    dispatch({
        type:CREATE_IMAGE_ANNOTATION,
        payload:{
            xmin:0,
            xmax:100,
            ymin:0,
            ymax:100,
            id:imageAnnotation.counter,
            color:color.getColor()
        }
    })
}
