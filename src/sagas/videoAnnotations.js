import {takeEvery,select} from "@redux-saga/core/effects";
import {SET_TIME,PLAY,PAUSE} from "../actions";
import {fabric} from "fabric";

const getIntervals = ({intervals}) => intervals
const getInterpolations = ({interpolations}) => interpolations
const getPlaying = ({videoControl:{playing}}) => playing

// Error while comparing.
const DELTA_T = 0.001

const willIntervalBeRendered =  (currentTime) => ({start,end}) => {
    return currentTime > start - DELTA_T && currentTime < end + DELTA_T
}

const getCanvas = (state) => state.canvas

function *renderShape({xmin,xmax,ymin,ymax,id,color}) {

    const canvas = yield select(getCanvas)
    const playing = yield select(getPlaying)

    const rect = yield new fabric.Rect({
        x:0,
        y:0,
        width:xmax-xmin,
        height:ymax-ymin,
        fill:"",
        strokeWidth:4,
        stroke:color,
        hasRotatingPoint: false,
        id:parseInt(id),
        selectable:!playing
    })

    rect.setControlsVisibility({mtr:false})

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
            yield renderShape(Object.assign({id:interpolationId},interpolationList[interpolationId]))
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
                        {id:from.id},
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
    yield takeEvery(SET_TIME,render)
}
