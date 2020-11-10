import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import reduxThunk from "redux-thunk"
import {createLogger} from "redux-logger"
import reducers from "./reducers"
import sagas from "./sagas"
import {MOVE_INTERPOLATION, SET_CURRENT_TIME, SORT_INTERVAL, UPDATE_STATE_TIME} from "./actions/video";

const IGNORED_ACTIONS = [
    MOVE_INTERPOLATION,
    SORT_INTERVAL,
    UPDATE_STATE_TIME,
    SET_CURRENT_TIME
]

const predicate = (ignoredActions) => (getState,{type,_}) => {
    for(let actionType of ignoredActions){
        if(actionType === type) return false
    }
    return true
}

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
    predicate:predicate(IGNORED_ACTIONS)
})

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware,reduxThunk,logger),
)

sagaMiddleware.run(sagas)

export default store
