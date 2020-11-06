import {all} from "redux-saga/effects"
import canvas from "./canvas"
import videoControl from "./videoControl"




export default function*(){

    yield all([
        canvas(),
        videoControl()
    ])
}
