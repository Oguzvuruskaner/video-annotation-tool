import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import canvas from "./canvas"
import videoAnnotations from "./videoAnnotations"
import videoControl from "./videoControl"


export default combineReducers({
    canvas,
    file,
    imageAnnotations,
    videoAnnotations,
    videoControl
})
