import React, {Component} from "react"
import {connect} from "react-redux"
import {FRAME_BACKWARD, FRAME_FORWARD} from "../../actions";
import {Fab} from "@material-ui/core";
import {ArrowBack,ArrowForward} from "@material-ui/icons";

class FrameControls extends Component{

    render(){
        const {frameForward,frameBackward} = this.props

        return <div className={"video-controller__control-group video-controller____control-group--frame"}>
            <div className={"video-controller__control-group__button-container"}>
                <Fab onClick={frameBackward}>
                    <ArrowBack/>
                </Fab>
                <Fab onClick={frameForward}>
                    <ArrowForward/>
                </Fab>
            </div>
            <label className={"video-controller__control-group__label"}>Frame Controls</label>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    frameForward : () => dispatch({type:FRAME_FORWARD}),
    frameBackward : () => dispatch({type:FRAME_BACKWARD})
})

export default connect(null,mapDispatchToProps)(FrameControls)
