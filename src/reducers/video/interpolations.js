import {
    CHANGE_TIME_INTERPOLATION,
    CREATE_INTERPOLATION,
    DELETE_INTERPOLATION,
    MOVE_INTERPOLATION,
    CLOSE_FILE
} from "../../actions";




export default (state = {counter:1},{type,payload}) => {

    let {interpolationId, intervalId,xmin,xmax,ymin,ymax,color,time} = payload || {}
    interpolationId = parseInt(interpolationId || 0)
    let obj = {}

    switch(type){

        case CLOSE_FILE:
            return {counter:1}

        case DELETE_INTERPOLATION:
            for(let i of Object.keys(state)){
                if(parseInt(i) !== interpolationId) obj[i] = state[i]
            }
            return obj

        case CREATE_INTERPOLATION:
            interpolationId = state.counter++
            obj[interpolationId] = {
                intervalId,
                xmin,
                xmax,
                ymin,
                ymax,
                color,
                time
            }
            return Object.assign({},state,obj)

        case MOVE_INTERPOLATION:

            interpolationId = state.counter++
            obj[interpolationId] = {
                xmin,
                xmax,
                ymin,
                ymax
            }
            return Object.assign({},state,obj)

        case CHANGE_TIME_INTERPOLATION:
            interpolationId = state.counter++
            obj[interpolationId] = {
                time
            }
            return Object.assign({},state,obj)

        default :
            return state
    }
}
