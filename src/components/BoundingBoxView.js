import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class BoundingBoxView extends Component{

    render() {
        return <div className={"border-"}>

        </div>

    }
}

export default compose(
    withRouter,
    connect()
)(BoundingBoxView)
