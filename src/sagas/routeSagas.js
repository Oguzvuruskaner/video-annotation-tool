import {takeEvery} from "redux-saga/effects"
import {CLOSE_FILE,UPLOAD_FILE} from "../actions";
import history from  "../history"

const routeWorker = (path) => function*(){
    history.push(path)
}


export function* directToApplication(){
    yield takeEvery(UPLOAD_FILE, routeWorker("/app"))
}


export function* directToMain(){
    yield takeEvery(CLOSE_FILE, routeWorker("/"))
}
