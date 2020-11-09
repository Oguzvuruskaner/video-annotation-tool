import {createInterpolation} from "./interpolations";
import {createInterval, deleteInterval} from "./intervals";

export const DELETE_VIDEO_ANNOTATION = "delete_video_annotation"
export const CREATE_VIDEO_ANNOTATION = "create_video_annotation"


export const deleteVideoAnnotation = (annotationId) => (dispatch,getState) => {

    const {videoAnnotations} = getState()

    for(let intervalId of videoAnnotations[annotationId].intervals){

        dispatch(deleteInterval(intervalId))
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

}


/*

State Hierarchy

ANNOTATION > INTERVAL > INTERPOLATION

 */
