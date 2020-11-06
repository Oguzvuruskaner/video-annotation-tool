import {PLAY, PAUSE, CLOSE_FILE} from "../actions"


// State is defined as an object rather than a single boolean for allowing possible extensions
// to allow customization of forward and backward operations.

export default (state = {playing:false},{type}) => {

    switch (type) {
        case CLOSE_FILE:
            return Object.assign({},state,{playing:false,frameLength: null})
        case PLAY:
            return Object.assign({},state,{playing:true})
        case PAUSE:
            return Object.assign({},state,{playing:false})
        default:
            return state
    }
}
