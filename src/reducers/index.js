import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import canvas from "./canvas"
import video from "./video"
import color from "./color"

export default combineReducers({
    canvas,
    color,
    ...video,
    file,
    imageAnnotations,
})
