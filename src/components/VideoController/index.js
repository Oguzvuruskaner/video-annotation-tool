import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";
import FrameControls from "./FrameControls"
import PlayPause from "./PlayPause"
import TimeControls from "./TimeControls"

class VideoController extends Component{

    render() {
        return <div className={"video-controller"}>
            <FrameControls/>
            <PlayPause/>
            <TimeControls/>
        </div>
    }
}

export default compose(
    withRouter,
    connect()
)(VideoController)
