import {SET_TIME, setCurrentTime} from "./control";
import {CREATE_INTERPOLATION, createInterpolation, DELETE_INTERPOLATION, deleteInterpolation} from "./interpolations";
import {CREATE_INTERVAL, createInterval, DELETE_INTERVAL, deleteInterval} from "./intervals";

export const DELETE_VIDEO_ANNOTATION = "delete_video_annotation"
export const CREATE_VIDEO_ANNOTATION = "create_video_annotation"


export const deleteVideoAnnotation = (annotationId) => (dispatch,getState) => {

    const {videoAnnotations} = getState()

    for(let intervalId of videoAnnotations[annotationId].intervals){

        deleteInterval(intervalId)
    }

}

export const createVideoAnnotation = () => (dispatch,getState) => {


    const {videoAnnotations,intervals} = getState()

    const annotationId = videoAnnotations.counter
    const intervalId = intervals.counter


    dispatch({
        type:CREATE_VIDEO_ANNOTATION,
        payload:{
            intervalId
        }
    })

    dispatch(createInterval(annotationId))
    dispatch(createInterpolation(intervalId))

}


/*

State Hierarchy

ANNOTATION > INTERVAL > INTERPOLATION

 */
