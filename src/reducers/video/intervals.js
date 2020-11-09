import {CLOSE_FILE, CREATE_INTERPOLATION, CREATE_INTERVAL, DELETE_INTERVAL, SORT_INTERVAL} from "../../actions";

export default (state = {counter:1},{type,payload}) => {

    let obj = {}
    let {annotationId,intervalId,interpolationId,interpolationIds,time,start,end} = payload || {}

    annotationId = parseInt(annotationId || 0)
    intervalId = parseInt(intervalId || 0)
    interpolationId = parseInt(interpolationId || 0)
    time = parseFloat(time || 0)

    switch(type){

        case CLOSE_FILE:
            return {counter:1}

        case SORT_INTERVAL:
            obj[intervalId] = state[intervalId]
            obj[intervalId]["interpolations"] = interpolationIds
            obj[intervalId]["start"] = start
            obj[intervalId]["end"] = end

            return Object.assign({},state,obj)

        case CREATE_INTERPOLATION:

            obj[intervalId] = state[intervalId]
            obj[intervalId]["interpolations"] = [...obj[intervalId]["interpolations"],interpolationId]

            return Object.assign({},state,obj)

        case CREATE_INTERVAL:
            intervalId = state.counter
            obj["counter"] = state.counter + 1
            obj[intervalId] = {}
            obj[intervalId]["annotationId"] = annotationId
            obj[intervalId]["interpolations"] = []
            obj[intervalId]["start"] = time
            obj[intervalId]["end"] = time
            return Object.assign({},state,obj)

        case DELETE_INTERVAL:
            for(let i of Object.keys(state)){
                if(parseInt(i) !== interpolationId) obj[i] = state[i]
            }
            return obj

        default:
            return state
    }
}
