import {takeEvery, select, put} from "@redux-saga/core/effects";
import {
    SET_TIME,
    PLAY,
    PAUSE,
    clearActiveObject,
    SET_CURRENT_TIME,
    CREATE_INTERPOLATION, UPDATE_STATE_TIME, MOVE_INTERPOLATION
} from "../actions";
import {fabric} from "fabric";
import {setActiveObject} from "../actions/video";
import store from "../store"

const getIntervals = ({intervals}) => intervals
const getInterpolations = ({interpolations}) => interpolations
const getPlaying = ({videoControl:{playing}}) => playing

// Error while comparing.
const DELTA_T = 0.02

const willIntervalBeRendered =  (currentTime) => ({start,end}) => {
    return currentTime > start - DELTA_T && currentTime < end + DELTA_T
}

const getCanvas = ({canvas}) => canvas

function *renderShapeFromState({_,payload})  {
    yield renderShape(payload)
}

function *renderShape({xmin,xmax,ymin,ymax,interpolationId,color}) {

    const canvas = yield select(getCanvas)
    const playing = yield select(getPlaying)

    const rect = yield new fabric.Rect({
        left:xmin,
        top:ymin,
        width:xmax-xmin,
        height:ymax-ymin,
        fill:"",
        strokeWidth:4,
        stroke:color,
        hasRotatingPoint: false,
        id:parseInt(interpolationId),
        selectable:!playing
    })

    rect.setControlsVisibility({mtr:false})

    rect.on("mousedown:before",() =>{
        store.dispatch(setActiveObject(interpolationId))
    })

    rect.on("mouseup",() => {
        store.dispatch(clearActiveObject())
    })


    yield canvas.add(rect)

}



function *render({_,payload}){

    const canvas = yield select(getCanvas)
    canvas.clear()

    const currentTime = yield payload
    const compareFunc = willIntervalBeRendered(currentTime)

    const intervals = yield select(getIntervals)
    const intervalList = Object.values(intervals).filter(a => typeof a !== "number")

    const intervalsWillBeRendered = yield intervalList.filter(compareFunc)

    const interpolationList = yield select(getInterpolations)


    for(let interval of intervalsWillBeRendered){
        if(interval.interpolations.length === 1){
            //Single interpolation case
            const interpolationId = interval.interpolations[0]
            console.log("Rendered Interpolations",interval.interpolations[0])
            yield renderShape(Object.assign({interpolationId},interpolationList[interpolationId]))
        }
        else{
            //Multiple interpolation case
            for(let i = 0; i < interval.interpolations.size - 1;i++){
                const from = interpolationList[interval.interpolations[i]]
                const to = interpolationList[interval.interpolations[i+1]]
                if(compareFunc({start:from.start,end:to.start})){

                    const {deltaXMin,deltaXMax,deltaYMin,deltaYMax} = {
                        deltaXMin : to.xmin - from.xmin,
                        deltaXMax : to.xmax - from.xmax,
                        deltaYMin : to.ymin - from.ymin,
                        deltaYMax : to.ymax - from.ymax,
                    }

                    const rateOfChange = (currentTime-from.time) / (to.time-from.time)

                    yield renderShape(Object.assign(
                        {interpolationId:interval.interpolations[i]},
                        {
                            color:from.color,
                            xmin:from.xmin + rateOfChange * deltaXMin,
                            xmax:from.xmax + rateOfChange * deltaXMax,
                            ymin:from.ymin + rateOfChange * deltaYMin,
                            ymax:from.ymax + rateOfChange * deltaYMax
                        }
                    ))
                    break
                }

            }
        }
    }
    canvas.renderAll()

}

function *freezeObject(){
    const canvas = yield select(getCanvas)

    const {_objects} = canvas
    for(let object of _objects){
        object.selectable = false
    }

}
function *unfreezeObjects(){
    const canvas = yield select(getCanvas)

    const {_objects} = canvas
    for(let object of _objects){
        object.selectable = true
    }
}


export default function* rootSaga(){
    yield takeEvery(PLAY,freezeObject)
    yield takeEvery(PAUSE,unfreezeObjects)
    yield takeEvery(UPDATE_STATE_TIME,render)
    yield takeEvery(CREATE_INTERPOLATION,renderShapeFromState)
}
