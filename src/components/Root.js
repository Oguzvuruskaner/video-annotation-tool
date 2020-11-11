import React from "react"
import {Provider} from "react-redux"
import {BrowserRouter,HashRouter} from "react-router-dom";
import store from "../store"

let Router
if (process.env.REACT_APP_ELECTRON == 1) {
    Router = HashRouter
}else{
    Router = BrowserRouter
}


export default ({children}) => (
    <Provider store={store}>
        <Router>
            {children}
        </Router>
    </Provider>
)
