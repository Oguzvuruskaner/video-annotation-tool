import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import canvas from "./canvas"
import videoAnnotations from "./video/annotations"
import videoControl from "./video/control"
import intervals from "./video/intervals"
import interpolations from "./video/interpolations"

export default combineReducers({
    canvas,
    file,
    imageAnnotations,
    intervals,
    interpolations,
    videoAnnotations,
    videoControl
})
