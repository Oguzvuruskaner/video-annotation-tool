import {CLOSE_FILE,ADD_ANNOTATION,UPDATE_ANNOTATION,DELETE_ANNOTATION} from "../actions";


export default (state = {
    counter:1,
},{type,payload}) => {

    const obj = {}
    const {id,xmin,ymin,xmax,ymax,color} = payload || {}

    switch (type) {
        case CLOSE_FILE:
            obj["counter"] = 1
            return obj
        case ADD_ANNOTATION:
            const annotationId = state.counter++
            obj[annotationId] = payload
            return Object.assign({},state,obj)

        case UPDATE_ANNOTATION:
            obj[id] = {xmin,ymin,xmax,ymax,color}
            return Object.assign({},state,obj)



        case DELETE_ANNOTATION:
            for (let i in state)
                if(i !== parseInt(id)) obj[i] = state[i]
            return obj

        default:
            return state
    }
}
