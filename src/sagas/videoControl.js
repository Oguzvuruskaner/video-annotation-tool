import {takeEvery,select,put} from "redux-saga/effects"
import {FRAME_FORWARD, FRAME_BACKWARD, TIME_FORWARD, TIME_BACKWARD, SET_FRAME_LENGTH, PLAY,PAUSE} from "../actions";

const getFrameLength = ({videoControl:{frameLength}}) => frameLength

function* frameForward() {

    const video = yield  document.querySelector("video")
    const frameLength = yield select(getFrameLength)
    video.currentTime = Math.min(video.duration,video.currentTime+frameLength)

}

function* frameBackward() {
    const video = yield  document.querySelector("video")
    const frameLength = yield select(getFrameLength)
    video.currentTime = Math.max(0,video.currentTime-frameLength)

}

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


function* calculateFrameLength(){

    const video = yield document.querySelector("video")
    let counter = 0
    let difference = 0

    const callback = (_,{mediaTime}) => {

        if(counter === 0) {
            counter++;
            video.requestVideoFrameCallback(callback)
        }else if(counter !== 1){
            difference = mediaTime
            counter++;
        }

    }

    yield video.requestVideoFrameCallback(callback)
    while(counter !== 2)
    yield video.currentTime = 0

    yield put({type:SET_FRAME_LENGTH,payload:difference})

}

export default function* rootSaga(){
    yield takeEvery(SET_FRAME_LENGTH,calculateFrameLength)
    yield takeEvery(FRAME_FORWARD,frameForward)
    yield takeEvery(FRAME_BACKWARD,frameBackward)
    yield takeEvery(TIME_FORWARD,timeForward)
    yield takeEvery(TIME_BACKWARD,timeBackward)
    yield takeEvery(PLAY,play)
    yield takeEvery(PAUSE,pause)
}
