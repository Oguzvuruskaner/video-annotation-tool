import {deleteInterval, sortInterval} from "./intervals";
import {renderObjects, renderSingleObject} from "./control";

export const CREATE_INTERPOLATION = "create_interpolation"
export const DELETE_INTERPOLATION = "delete_interpolation"
export const MOVE_INTERPOLATION = "move_interpolation"
export const CHANGE_TIME_INTERPOLATION = "change_time_interpolation"
export const BULK_DELETE_INTERPOLATION = "bulk_delete_interpolation"


export const bulkDeleteInterpolations = (interpolationIds) => (dispatch,getState) =>{

    dispatch({
        type:BULK_DELETE_INTERPOLATION,
        payload:interpolationIds
    })

    dispatch(renderObjects())
}


export const deleteInterpolation = (interpolationId) => (dispatch, getState) => {


    const {interpolations} = getState()
    const {intervalId} = interpolations[interpolationId]

    dispatch({
        type:DELETE_INTERPOLATION,
        payload:{
            interpolationId,
            intervalId
        }
    })

    const {intervals} = getState()

    // Check if deleted interpolations is the last remaining interpolation of interval.
    if (intervals[intervalId].interpolations.length !== 1)
        return

    dispatch(deleteInterval(intervalId))
    dispatch(renderObjects())

}

export const createInterpolation = (intervalId) => (dispatch,getState) => {

    const {interpolations,videoControl:{currentTime}} = getState()

    //Conditional to here, check for closeness of interpolations.

    dispatch({
        type:CREATE_INTERPOLATION,
        payload:{
            interpolationId:interpolations.counter,
            intervalId,
            xmin:0,
            xmax:100,
            ymin:0,
            ymax:100,
            time:currentTime
    }})


    dispatch(sortInterval(intervalId))
    dispatch(renderSingleObject({interpolationId:interpolations.counter,
        intervalId,
        xmin:0,
        xmax:100,
        ymin:0,
        ymax:100,
        time:currentTime}))
}

export const moveInterpolation = ({interpolationId,xmin,xmax,ymin,ymax}) => (dispatch,getState) => {

    dispatch({
        type:MOVE_INTERPOLATION,
        payload:{
            interpolationId,
            xmin,
            xmax,
            ymin,
            ymax
        }
    })

    const {interpolations} = getState()
    dispatch(sortInterval(interpolations[interpolationId].intervalId))
}

export const changeTimeInterpolation = ({interpolationId,time}) => (dispatch,getState) => {
    dispatch({
        type:CHANGE_TIME_INTERPOLATION,
        payload: {
            interpolationId,
            time
        }
    })

    const {interpolations} = getState()
    dispatch(sortInterval(interpolations[interpolationId].intervalId))

}
