export const DELETE_VIDEO_ANNOTATION = "delete_video_annotation"
export const CREATE_VIDEO_ANNOTATION = "create_video_annotation"

export const CREATE_INTERVAL = "create_interpolation_interval"
export const DELETE_INTERVAL = "delete_interpolation_interval"

export const CREATE_INTERPOLATION = "create_interpolation"
export const DELETE_INTERPOLATION = "delete_interpolation"
export const MOVE_INTERPOLATION = "move_interpolation"
export const CHANGE_TIME_INTERPOLATION = "change_time_interpolation"


export const deleteVideoAnnotation = (annotationId) => (dispatch,getState) => {

    const {videoAnnotations,intervals} = getState()



    for(let intervalId of videoAnnotations[annotationId].intervals){

        for(let interpolationId of intervals[intervalId].interpolations){
            dispatch({
                type:DELETE_INTERPOLATION,
                payload:{
                    interpolationId : interpolationId,
                    intervalId
                }
            })
        }
        dispatch({
            type:DELETE_INTERVAL,
            payload:{
                annotationId,
                intervalId :intervalId
            }
        })
    }

    dispatch({
        type:DELETE_VIDEO_ANNOTATION,
        payload:{
            annotationId,
        }
    })

}

export const createVideoAnnotation = () => (dispatch,getState) => {


    const {videoAnnotations,intervals,interpolations,color,videoControl:{currentTime}} = getState()

    const annotationId = videoAnnotations.counter
    const intervalId = intervals.counter
    const interpolationId = interpolations.counter


    dispatch({
        type:CREATE_VIDEO_ANNOTATION,
        payload:{
            intervalId
        }
    })

    dispatch({
        type:CREATE_INTERVAL,
        payload:{
            annotationId,
            intervalId,
            time:currentTime
        }
    })

    dispatch({
        type:CREATE_INTERPOLATION,
        payload:{
            intervalId,
            interpolationId,
            time:currentTime,
            xmin:0,
            xmax:100,
            ymin:0,
            ymax:100,
            color : color.getColor(),
            id:interpolationId
        }
    })
}


/*

State Hierarchy

ANNOTATION > INTERVAL > INTERPOLATION

 */
