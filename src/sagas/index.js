import {all} from "redux-saga/effects"
import {directToApplication,directToMain} from "./routeSagas"

export default function*(){

    yield all([
        directToMain(),
        directToApplication()
    ])
}
