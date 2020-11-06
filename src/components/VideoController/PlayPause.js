import React, {Component} from "react"
import {connect} from "react-redux"
import {PAUSE, PLAY} from "../../actions";
import {Fab} from "@material-ui/core";
import {PlayArrow,Pause} from "@material-ui/icons";

class PlayPause extends Component{

    render(){
        const {play,pause,playing} = this.props

        return <div className={"video-controller__control-group video-controller____control-group--play"}>
            {
                (playing) ? <Fab onClick={pause}>
                    <Pause/>
                </Fab> : <Fab onClick={play}>
                    <PlayArrow/>
                </Fab>
            }
        </div>
    }
}

const mapStateToProps = ({videoControl:{playing}}) => ({playing})

const mapDispatchToProps = (dispatch) => ({
    play : () => dispatch({type:PLAY}),
    pause : () => dispatch({type:PAUSE})
})

export default connect(mapStateToProps,mapDispatchToProps)(PlayPause)
