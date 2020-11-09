import {changeTimeInterpolation} from "./interpolations";

export const PLAY = "play"
export const PAUSE = "pause"

export const TIME_FORWARD = "time_forward"
export const TIME_BACKWARD = "time_backward"
export const SET_DURATION = "set_duration"
export const SET_CURRENT_TIME = "set_current_time"
export const UPDATE_STATE_TIME =  "update_state_time"

export const setDuration = (duration) => ({
    type:SET_DURATION,
    payload:duration
})

export const setCurrentTime = (time) => ({
    type:SET_CURRENT_TIME,
    payload:time
})

export const updateStateTime = (time) => (dispatch,getState) => {


    dispatch({
        type:UPDATE_STATE_TIME,
        payload:time
    })

    const {activeObject} = getState()
    if(activeObject !== null) dispatch(changeTimeInterpolation({interpolationId:activeObject,time}))

}

export const scrollTime = (deltaWheel) => (dispatch,getState) => {
    const deltaT = deltaWheel/1000
    const {videoControl:{duration,currentTime},activeObject} = getState()
    const time = Math.min(Math.max(currentTime+deltaT,0),duration)

    dispatch(setCurrentTime(time))
}
