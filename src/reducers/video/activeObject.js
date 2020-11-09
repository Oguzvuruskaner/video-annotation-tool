import {CLEAR_ACTIVE_OBJECT, CLOSE_FILE, SET_ACTIVE_OBJECT} from "../../actions";

export default (state = null,{type,payload}) => {

    switch (type) {
        case CLOSE_FILE:
            return null
        case SET_ACTIVE_OBJECT:
            return payload
        case CLEAR_ACTIVE_OBJECT:
            return null
        default:
            return state
    }
}
