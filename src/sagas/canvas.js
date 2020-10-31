import {select,takeEvery} from "redux-saga/effects"
import {fabric} from "fabric"
import {ADD_ANNOTATION, CREATE_CANVAS, PLACE_CANVAS} from "../actions";
import {getFrameSizeInfo} from "../utils";

const getCanvas = (state) => state.canvas

function* addAnnotation({_,payload}){

    const {xmin,xmax,ymin,ymax,color} = payload

    const canvas = yield select(getCanvas)

    const rect = yield new fabric.Rect({
        x:0,
        y:0,
        width:xmax-xmin,
        height:ymax-ymin,
        fill:"",
        strokeWidth:4,
        stroke:color,
        hasRotatingPoint: false
    })
    yield canvas.add(rect)
}

function *placeCanvas(){
    const canvasContainer = yield document.querySelector(".canvas-container")
    const media = yield document.querySelector("img") || document.querySelector("video")

    const {height,width,left,top} = yield getFrameSizeInfo(media)
    console.log({height,width,left,top})
    canvasContainer.style.width = `${width}px`
    canvasContainer.style.height = `${height}px`
    canvasContainer.style.top = `${top}px`
    canvasContainer.style.left = `${left}px`

}

export default function* rootSaga(){
    yield takeEvery(ADD_ANNOTATION,addAnnotation)
    yield takeEvery(PLACE_CANVAS,placeCanvas)
}
