import {
    CREATE_VIDEO_ANNOTATION,
    CLOSE_FILE, CREATE_INTERVAL, DELETE_INTERVAL,
    DELETE_VIDEO_ANNOTATION,
} from "../../actions";




export default (state = {
    counter : 1
}, {type,payload}) => {

    let {annotationId,intervalId} = payload || {}
    let obj = {}
    annotationId = parseInt(annotationId || 0)
    intervalId = parseInt(intervalId || 0)

    switch (type) {
        case CLOSE_FILE:
            obj["counter"] = 1
            return obj


        case DELETE_INTERVAL:
            obj[annotationId] = state[annotationId]
            obj[annotationId]["intervals"] = obj[annotationId]["intervals"].filter(id => id !== intervalId)
            return  Object.assign({},state,obj)

        case CREATE_INTERVAL:
            obj[annotationId] = state[annotationId]
            obj[annotationId]["intervals"] = [...obj[annotationId]["intervals"],intervalId]
            return  Object.assign({},state,obj)

        case DELETE_VIDEO_ANNOTATION:
            for(let id of Object.keys(state)){
                if(annotationId !== parseInt(id)) obj[id] = state[id]
            }
            return obj

        case CREATE_VIDEO_ANNOTATION:
            annotationId = state.counter
            obj[annotationId] = {}
            obj["counter"] = state.counter+1
            obj[annotationId]["intervals"] = []

            return Object.assign({},state,obj)

        default:
            return state
    }
}
