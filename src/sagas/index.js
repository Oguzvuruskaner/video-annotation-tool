import {all} from "redux-saga/effects"
import canvas from "./canvas"

export default function*(){

    yield all([
        canvas()
    ])
}
