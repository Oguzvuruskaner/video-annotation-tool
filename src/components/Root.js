import React from "react"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom";
import store from "../store"

export default ({children}) => (
    <Provider store={store}>
        <Router>
            {children}
        </Router>
    </Provider>
)
