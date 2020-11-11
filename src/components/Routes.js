import React from "react"
import {Route, Switch} from "react-router-dom"
import FileInput from "../pages/FileDrop"
import Application from "../pages/Application";

export default () => (<Switch>
    <Route path="/" exact component={FileInput}/>
    <Route path="/app" component={Application}/>
</Switch>)

