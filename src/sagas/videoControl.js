import {takeEvery} from "redux-saga/effects"
import {TIME_FORWARD, TIME_BACKWARD, PLAY, PAUSE, SET_CURRENT_TIME} from "../actions";




function* timeForward() {
    const video = yield document.querySelector("video")
    video.currentTime = Math.min(video.duration,video.currentTime+1)

}

function* timeBackward() {
    const video = yield document.querySelector("video")
    video.currentTime = Math.max(0,video.currentTime-1)

}

function* play() {
    const video = yield document.querySelector("video")
    video.play()
}

function* pause() {
    const video = yield document.querySelector("video")
    video.pause()
}

function *setCurrentTime({_,payload}){
    const video = document.querySelector(".media")
    video.currentTime = payload
}


export default function* rootSaga(){
    yield takeEvery(TIME_FORWARD,timeForward)
    yield takeEvery(TIME_BACKWARD,timeBackward)
    yield takeEvery(PLAY,play)
    yield takeEvery(SET_CURRENT_TIME,setCurrentTime)
    yield takeEvery(PAUSE,pause)
}
