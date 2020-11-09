import {SET_TIME} from "./control";
import {CREATE_INTERPOLATION, DELETE_INTERPOLATION} from "./interpolations";
import {CREATE_INTERVAL, DELETE_INTERVAL} from "./intervals";

export const DELETE_VIDEO_ANNOTATION = "delete_video_annotation"
export const CREATE_VIDEO_ANNOTATION = "create_video_annotation"


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

    const {videoControl} = getState()

    dispatch({
        type:SET_TIME,
        payload:videoControl.currentTime
    })
}


/*

State Hierarchy

ANNOTATION > INTERVAL > INTERPOLATION

 */
