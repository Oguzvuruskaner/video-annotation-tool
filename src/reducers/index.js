import {combineReducers} from "redux"
import file from "./file"
import imageAnnotation from "./imageAnnotations";
import mode from "./mode"

export default combineReducers({
    file,
    imageAnnotation,
    mode
})
