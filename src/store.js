import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import reduxThunk from "redux-thunk"
import {createLogger} from "redux-logger"
import reducers from "./reducers"
import sagas from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
    predicate:(getState, action) => !action.type.includes('move') && !action.type.includes('sort')
})

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware,reduxThunk,logger),
)

sagaMiddleware.run(sagas)

export default store
