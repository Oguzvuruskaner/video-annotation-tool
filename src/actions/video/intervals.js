import {DELETE_VIDEO_ANNOTATION, deleteVideoAnnotation} from "./annotations";
import {bulkDeleteInterpolations, createInterpolation} from "./interpolations";


export const SORT_INTERVAL = "sort_interval"
export const CREATE_INTERVAL = "create_interval"
export const DELETE_INTERVAL = "delete_interval"

export const createInterval = (annotationId) => (dispatch, getState) => {

    const {color,videoControl:{currentTime},intervals} = getState()
    const intervalId = intervals.counter

    dispatch({
        type:CREATE_INTERVAL,
        payload:{
            annotationId,
            time:currentTime,
            intervalId,
            color:color.getColor()
        }
    })


    dispatch(createInterpolation(intervalId))
}

export const sortInterval = (intervalId) => (dispatch,getState) => {

    const {intervals,interpolations} = getState()

    let start,end
    let interpolationIdsInInterval = intervals[intervalId].interpolations

    interpolationIdsInInterval = interpolationIdsInInterval.sort((a,b) => interpolations[a].time > interpolations[b].time)
    start = interpolations[interpolationIdsInInterval[0]].time
    end = interpolations[interpolationIdsInInterval[interpolationIdsInInterval.length-1]].time
    dispatch({
        type:SORT_INTERVAL,
        payload:{
            intervalId,
            start,
            end,
            interpolationIds:interpolationIdsInInterval
        }
    })

}


export const deleteInterval = (intervalId) => (dispatch,getState) => {

    const {intervals} =  getState()
    const {interpolations} = intervals[intervalId]

    dispatch(bulkDeleteInterpolations(interpolations))


    dispatch({
        type:DELETE_INTERVAL,
        payload:{
            annotationId:intervals[intervalId].annotationId,
            intervalId
        }
    })





}
