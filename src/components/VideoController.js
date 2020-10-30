import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class VideoController extends Component{

    render() {
        return <div className={"video-controller"}>

        </div>
    }
}

export default compose(
    withRouter,
    connect()
)(VideoController)
