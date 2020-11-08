import {CREATE_INTERPOLATION, DELETE_INTERPOLATION, DELETE_INTERVAL, DELETE_VIDEO_ANNOTATION} from "./annotations";

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

export const createInterpolation = (intervalId) => (dispatch,getState) => {

    const {interpolations,color,videoControl:{currentTime}} = getState()


    dispatch({
        type:CREATE_INTERPOLATION,
        payload:{
            interpolationId:interpolations.counter,
            intervalId,
            xmin:0,
            xmax:100,
            ymin:0,
            ymax:100,
            time:currentTime,
            color:color.getColor()
    }})
}
