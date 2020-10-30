import {combineReducers} from "redux"
import file from "./file"
import imageAnnotations from "./imageAnnotations";
import mode from "./mode"

export default combineReducers({
    file,
    imageAnnotations,
    mode
})
