import {DELETE_VIDEO_ANNOTATION} from "./annotations";
import {DELETE_INTERVAL, deleteInterval} from "./intervals";

export const CREATE_INTERPOLATION = "create_interpolation"
export const DELETE_INTERPOLATION = "delete_interpolation"
export const MOVE_INTERPOLATION = "move_interpolation"
export const CHANGE_TIME_INTERPOLATION = "change_time_interpolation"
export const BULK_DELETE_INTERPOLATION = "bulk_delete_interpolation"


export const bulkDeleteInterpolations = (interpolationIds) => ({
    type:BULK_DELETE_INTERPOLATION,
    payload:interpolationIds
})


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

    deleteInterval(intervalId)


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

export const moveInterpolation = ({interpolationId,xmin,xmax,ymin,ymax}) => ({
    type:MOVE_INTERPOLATION,
    payload:{
        interpolationId,
        xmin,
        xmax,
        ymin,
        ymax
    }
})
