import {CLOSE_FILE,CREATE_IMAGE_ANNOTATION,UPDATE_IMAGE_ANNOTATION,DELETE_IMAGE_ANNOTATION} from "../actions";


export default (state = {
    counter:1,
},{type,payload}) => {

    const obj = {}
    const {id,xmin,ymin,xmax,ymax,color} = payload || {}

    switch (type) {
        case CLOSE_FILE:
            obj["counter"] = 1
            return obj
        case CREATE_IMAGE_ANNOTATION:
            const annotationId = state.counter++
            obj[annotationId] = payload
            return Object.assign({},state,obj)

        case UPDATE_IMAGE_ANNOTATION:
            obj[id] = {xmin,ymin,xmax,ymax,color}
            return Object.assign({},state,obj)

        case DELETE_IMAGE_ANNOTATION:
            for (let i of state)
                if(i !== parseInt(id)) obj[i] = state[i]
            return obj

        default:
            return state
    }
}
