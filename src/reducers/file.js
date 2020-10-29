import {CLOSE_FILE,UPLOAD_FILE} from "../actions"

export default (state = null,{type,payload}) => {

    switch (type) {
        case UPLOAD_FILE:
            return payload
        case CLOSE_FILE:
            return null
        default:
            return state
    }
}
