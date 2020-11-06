import {select,takeEvery} from "redux-saga/effects"
import {fabric} from "fabric"
import {ADD_ANNOTATION, PLACE_CANVAS} from "../actions";
import {getFrameSizeInfo, getRenderedSize} from "../utils";

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

function *placeVideoCanvas(media){

    const canvasContainer = yield document.querySelector(".canvas-container")
    const canvas = yield select(getCanvas)

    const pos = window.getComputedStyle(media).getPropertyValue('object-position').split(' ');

    const{height,width,top,left} = yield getRenderedSize(
        true,
        media.clientWidth,
        media.clientHeight,
        media.videoWidth,
        media.videoHeight,
        parseInt(pos[0]),
        parseInt(pos[1])
    )

    yield canvas.setDimensions({height,width})

    canvasContainer.style.width = `${parseInt(width)}px`
    canvasContainer.style.height = `${parseInt(height)}px`
    canvasContainer.style.top = `${parseInt(top)}px`
    canvasContainer.style.left = `${parseInt(left)}px`
}

function *placeImageCanvas(media){

    const canvas = yield select(getCanvas)
    const canvasContainer = yield document.querySelector(".canvas-container")

    const {height,width,left,top} = yield getFrameSizeInfo(media)


    yield canvas.setDimensions({height,width})

    canvasContainer.style.width = `${parseInt(width)}px`
    canvasContainer.style.height = `${parseInt(height)}px`
    canvasContainer.style.top = `${parseInt(top)}px`
    canvasContainer.style.left = `${parseInt(left)}px`
}

function *placeCanvas(){
    const media = yield document.querySelector(".media")

    if(media.nodeName === "IMG") yield placeImageCanvas(media)
    else yield placeVideoCanvas(media)
}

export default function* rootSaga(){
    yield takeEvery(ADD_ANNOTATION,addAnnotation)
    yield takeEvery(PLACE_CANVAS,placeCanvas)
}
