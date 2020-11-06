import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";
import VideoSlider from "./VideoSlider";
import ControlGroup from "./ControlGroup";

class VideoController extends Component{

    render() {
        return <div className={"video-controller"}>
            <VideoSlider/>
            <ControlGroup/>


        </div>
    }
}

export default compose(
    withRouter,
    connect()
)(VideoController)
