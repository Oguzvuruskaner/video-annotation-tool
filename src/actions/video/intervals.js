import {deleteVideoAnnotation} from "./annotations";
import {bulkDeleteInterpolations, createInterpolation} from "./interpolations";

export const CREATE_INTERVAL = "create_interval"
export const DELETE_INTERVAL = "deleteC_interval"

export const createInterval = (annotationId) => (dispatch, getState) => {

    const {videoControl:{currentTime},intervals} = getState()
    const intervalId = intervals.counter

    dispatch({
        type:CREATE_INTERVAL,
        payload:{
            annotationId,
            time:currentTime,
            intervalId
        }
    })


    createInterpolation(intervalId)
}




export const deleteInterval = (intervalId) => (dispatch,getState) => {

    const {intervals,videoAnnotations} =  getState()
    const {annotationId,interpolations} = intervals[intervalId]

    dispatch(bulkDeleteInterpolations(interpolations))

    dispatch({
        type:DELETE_INTERVAL,
        payload:{
            intervalId
        }
    })

    if(videoAnnotations[annotationId].intervals.length === 1)
        dispatch(deleteVideoAnnotation(annotationId))



}
