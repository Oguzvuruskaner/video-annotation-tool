import {PLAY, PAUSE, CLOSE_FILE, UPDATE_TIME, SET_DURATION, SET_TIME} from "../actions"


// State is defined as an object rather than a single boolean for allowing possible extensions
// to allow customization of forward and backward operations.

export default (state = {
    playing:false,
    currentTime : null,
    duration:null
},{type,payload}) => {

    switch (type) {
        case CLOSE_FILE:
            return Object.assign({},state,{playing:false,frameLength: null})
        case PLAY:
            return Object.assign({},state,{playing:true})
        case UPDATE_TIME || SET_TIME:
            return Object.assign({},state,{currentTime:payload})
        case PAUSE:
            return Object.assign({},state,{playing:false})
        case SET_DURATION:
            return Object.assign({},state,{duration:payload})
        default:
            return state
    }
}
