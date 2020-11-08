import {DELETE_INTERVAL,CREATE_INTERVAL, DELETE_VIDEO_ANNOTATION} from "./annotations";

export const createInterval = (annotationId) => (dispatch,getState) => {

    const {videoControl:{currentTime},intervals:{counter}} = getState()

    dispatch({
        type:CREATE_INTERVAL,
        payload:{
            annotationId,
            time:currentTime,
            intervalId:counter
        }
    })
}

export const deleteInterval = (intervalId) => (dispatch,getState) => {

    const {intervals} = getState()
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
