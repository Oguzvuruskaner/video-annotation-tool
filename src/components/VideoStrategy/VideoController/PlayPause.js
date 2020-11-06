import React, {Component} from "react"
import {connect} from "react-redux"
import {PAUSE, PLAY} from "../../../actions";
import {Fab} from "@material-ui/core";
import {PlayArrow,Pause} from "@material-ui/icons";

class PlayPause extends Component{

    render(){
        const {play,pause,playing} = this.props

        if (playing) return <Fab className={"video-controller__button"} onClick={pause}>
            <Pause/>
        </Fab>
        else return <Fab className={"video-controller__button"} onClick={play}>
            <PlayArrow/>
        </Fab>

    }
}

const mapStateToProps = ({videoControl:{playing}}) => ({playing})

const mapDispatchToProps = (dispatch) => ({
    play : () => dispatch({type:PLAY}),
    pause : () => dispatch({type:PAUSE})
})

export default connect(mapStateToProps,mapDispatchToProps)(PlayPause)
