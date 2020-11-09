import {CREATE_CANVAS, DELETE_CANVAS, PLACE_CANVAS} from "../canvas";

export const PLAY = "play"
export const PAUSE = "pause"

export const TIME_FORWARD = "time_forward"
export const TIME_BACKWARD = "time_backward"

export const UPDATE_TIME = "update_time"
export const SET_DURATION = "set_duration"
export const SET_TIME = "set_time"

export const updateTime = (currentTime) => ({
    type:UPDATE_TIME,
    payload:currentTime
})

export const setDuration = (duration) => ({
    type:SET_DURATION,
    payload:duration
})

export const setTime = (time) => ({
    type:SET_DURATION,
    payload:time
})

