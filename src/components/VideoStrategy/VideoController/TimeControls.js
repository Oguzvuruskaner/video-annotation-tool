import React,{Component} from "react"
import {connect} from "react-redux"
import {TIME_BACKWARD, TIME_FORWARD} from "../../../actions";
import {FastRewind,FastForward} from "@material-ui/icons";
import {Fab} from "@material-ui/core";

class TimeControls extends Component{

    render(){
        const {timeForward,timeBackward} = this.props

        return <>
            <Fab className={"video-controller__button"} onClick={timeBackward}>
                <FastRewind/>
            </Fab>
            <Fab className={"video-controller__button"} onClick={timeForward}>
                <FastForward/>
            </Fab>
        </>
    }
}

const mapDispatchToProps = (dispatch) => ({
    timeForward : () => dispatch({type:TIME_FORWARD}),
    timeBackward : () => dispatch({type:TIME_BACKWARD})
})

export default connect(null,mapDispatchToProps)(TimeControls)
