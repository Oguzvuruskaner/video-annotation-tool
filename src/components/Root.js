import React from "react"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom";
import store from "../store"
import history from "../history";

export default ({children}) => (
    <Provider store={store}>
        <Router history={history}>
            {children}
        </Router>
    </Provider>
)
