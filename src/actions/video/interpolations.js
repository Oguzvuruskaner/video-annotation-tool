import {DELETE_INTERPOLATION, DELETE_INTERVAL, DELETE_VIDEO_ANNOTATION} from "./annotations";

export const deleteInterpolation = (interpolationId) => (dispatch,getState) => {


    const {interpolations} = getState()
    const {intervalId} = interpolations[interpolationId]

    dispatch({
        type:DELETE_INTERPOLATION,
        payload:{
            interpolationId
        }
    })

    const {intervals} = getState()

    // Check if deleted interpolations is the last remaining interpolation of interval.
    if (intervals[intervalId].interpolations.length !== 1)
        return

    const {videoAnnotation} = getState()
    const {annotationId} = intervals[intervalId]

    dispatch({
        type:DELETE_INTERVAL,
        payload:{
            intervalId
        }
    })

    if(videoAnnotation[annotationId].intervals.length !== 1)
        return

    dispatch({
        type:DELETE_VIDEO_ANNOTATION,
        payload:{
            annotationId
        }
    })


}

