import {CHANGE_MODE,DRAWING_MODE} from "../actions";

export default (state= DRAWING_MODE,{type,payload}) => {

    switch (type) {
        case CHANGE_MODE:
            return payload
        default:
            return state
    }

}
