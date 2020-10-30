import React from "react"
import {Route} from "react-router-dom"
import FileInput from "../pages/FileDrop"
import Application from "../pages/Application";

export default () => (<>
    <Route path="/" exact component={FileInput}/>
    <Route path="/app" component={Application}/>
</>)

