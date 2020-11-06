import {PLAY, PAUSE, CLOSE_FILE, SET_FRAME_LENGTH} from "../actions"


// State is defined as an object rather than a single boolean for allowing possible extensions
// to allow customization of forward and backward operations.

export default (state = {playing:false,frameLength:null},{type,payload}) => {

    switch (type) {
        case CLOSE_FILE:
            return Object.assign({},state,{playing:false,frameLength: null})
        case PLAY:
            return Object.assign({},state,{playing:true})
        case SET_FRAME_LENGTH:
            return Object.assign({},state,{frameLength:payload})

        case PAUSE:
            return Object.assign({},state,{playing:false})
        default:
            return state
    }
}
