import {CREATE_CANVAS,DELETE_CANVAS} from "../actions";

export default (state = null,{type,payload}) => {
    switch(type){
        case CREATE_CANVAS:
            return payload
        case DELETE_CANVAS:
            return null
        default:
            return state
    }
}
