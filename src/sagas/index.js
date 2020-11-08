import {all} from "redux-saga/effects"
import canvas from "./canvas"
import videoControl from "./videoControl"
import videoAnnotations from "./videoAnnotations";



export default function*(){

    yield all([
        canvas(),
        videoAnnotations(),
        videoControl()
    ])
}
