import {CLOSE_FILE, DELETE_VIDEO_ANNOTATION,OPEN_DRAWER,CLOSE_DRAWER} from "../../actions";

export default (state = null , {type,payload}) => {
    switch(type){

        case DELETE_VIDEO_ANNOTATION:
            if(payload.annotationId === state) return null
            else return state
        case CLOSE_FILE:
            return null
        case CLOSE_DRAWER:
            return null
        case OPEN_DRAWER:
            return payload
        default :
            return state
    }
}
