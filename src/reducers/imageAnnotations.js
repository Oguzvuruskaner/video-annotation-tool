import {CLOSE_FILE,ADD_ANNOTATION,UPDATE_ANNOTATION,DELETE_ANNOTATION} from "../actions";
import ColorScheme from "color-scheme"
import {choice} from "../utils"


export default (state = {
    counter:1,
    colors: new ColorScheme().from_hue(21).scheme("triade").variation("soft").colors()
},{type,payload}) => {

    const obj = {}
    const {id,xmin,ymin,xmax,ymax,color} = payload || {}

    switch (type) {
        case CLOSE_FILE:
            return obj
        case ADD_ANNOTATION:
            const annotationId = state.counter++
            obj[annotationId] = payload
            obj[annotationId]["color"] = choice(state.colors)
            return Object.assign({},state,obj)

        case UPDATE_ANNOTATION:
            obj[id] = {xmin,ymin,xmax,ymax,color}
            return Object.assign({},state,obj)

        case DELETE_ANNOTATION:
            for (var i in state)
                if(i != id) obj[i] = state[i]
            return obj

        default:
            return state
    }
}
