import {select,takeEvery} from "redux-saga/effects"
import {fabric} from "fabric"
import {ADD_ANNOTATION, CREATE_CANVAS, PLACE_CANVAS} from "../actions";
import {getFrameSizeInfo} from "../utils";
import canvas from "../reducers/canvas";

const getCanvas = (state) => state.canvas
const getImageAnnotations = (state) => state.imageAnnotations

function* addAnnotation({_,payload}){

    const {xmin,xmax,ymin,ymax,color} = payload

    const canvas = yield select(getCanvas)
    const imageAnnotations = yield select(getImageAnnotations)

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
    rect["id"] = imageAnnotations.counter

    yield canvas.add(rect)
}

function *placeCanvas(){
    const canvasContainer = yield document.querySelector(".canvas-container")
    const media = yield document.querySelector("img") || document.querySelector("video")

    const {height,width,left,top} = yield getFrameSizeInfo(media)

    const canvas = yield select(getCanvas)

    canvas.setDimensions({height,width})

    canvasContainer.style.width = `${parseInt(width)}px`
    canvasContainer.style.height = `${parseInt(height)}px`
    canvasContainer.style.top = `${parseInt(top)}px`
    canvasContainer.style.left = `${parseInt(left)}px`

}

export default function* rootSaga(){
    yield takeEvery(ADD_ANNOTATION,addAnnotation)
    yield takeEvery(PLACE_CANVAS,placeCanvas)
}
