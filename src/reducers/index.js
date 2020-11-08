import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import canvas from "./canvas"
import video from "./video"

export default combineReducers({
    canvas,
    ...video,
    file,
    imageAnnotations,
})
