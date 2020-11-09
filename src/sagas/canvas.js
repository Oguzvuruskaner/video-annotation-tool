import {select,takeEvery} from "redux-saga/effects"
import {fabric} from "fabric"
import {CREATE_IMAGE_ANNOTATION, DELETE_IMAGE_ANNOTATION, PLACE_CANVAS, REMOVE_OBJECT, SELECT_OBJECT} from "../actions";
import {getFrameSizeInfo, getRenderedSize} from "../utils";
import {put} from "@redux-saga/core/effects";

const getCanvas = (state) => state.canvas

function* addAnnotation({type,payload}){

    const {xmin,xmax,ymin,ymax,color,id} = payload

    const canvas = yield select(getCanvas)

    const rect = yield new fabric.Rect({
        left:0,
        top:0,
        width:xmax-xmin,
        height:ymax-ymin,
        fill:"",
        strokeWidth:4,
        stroke:color,
        hasRotatingPoint: false,
        id:parseInt(id)
    })
    rect.setControlsVisibility({mtr:false})


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

function *selectObject({_,payload}){
    const canvas = yield select(getCanvas)
    const object = canvas._objects.filter(({id}) => id === parseInt(payload))
    canvas.setActiveObject(object)
}

function *removeObject({_,payload}){
    const canvas = yield select(getCanvas)
    const objects = canvas.getObjects()

    const willBeRemoved = yield objects.filter(({id}) => id === parseInt(payload))[0]
    canvas.remove(willBeRemoved)



    //TODO: ADD TO UNDO/REDO QUEUE FROM HERE

    yield put({
        type:DELETE_IMAGE_ANNOTATION,
        payload:{id:payload}
    })

}

export default function* rootSaga(){
    yield takeEvery(CREATE_IMAGE_ANNOTATION,addAnnotation)
    yield takeEvery(PLACE_CANVAS,placeCanvas)
    yield takeEvery(SELECT_OBJECT,selectObject)
    yield takeEvery(REMOVE_OBJECT,removeObject)
}
