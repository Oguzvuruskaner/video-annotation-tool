import React from "react"
import {Route} from "react-router-dom"
import FileInput from "../pages/FileDrop"

export default () => (<>
    <Route path="/" exact component={FileInput}/>
    {/*<Route path="app" component={()=>null}/>*/}
</>)

