import React,{Component} from "react"
import {connect} from "react-redux"
import {TIME_BACKWARD, TIME_FORWARD} from "../../actions";
import {Fab} from "@material-ui/core";
import {FastRewind,FastForward} from "@material-ui/icons";

class TimeControls extends Component{

    render(){
        const {timeForward,timeBackward} = this.props

        return <div className={"video-controller__control-group video-controller____control-group--time"}>
            <div className={"video-controller__control-group__button-container"}>
                <Fab onClick={timeBackward}>
                    <FastRewind/>
                </Fab>
                <Fab onClick={timeForward}>
                    <FastForward/>
                </Fab>
            </div>
            <label className={"video-controller__control-group__label"}>Time Controls</label>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    timeForward : () => dispatch({type:TIME_FORWARD}),
    timeBackward : () => dispatch({type:TIME_BACKWARD})
})

export default connect(null,mapDispatchToProps)(TimeControls)
