import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import mode from "./mode"
import canvas from "./canvas"

export default combineReducers({
    canvas,
    file,
    imageAnnotations,
    mode
})
