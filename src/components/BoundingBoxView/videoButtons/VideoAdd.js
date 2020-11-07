import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ADD_ANNOTATION, CREATE_VIDEO_ANNOTATION, createVideoAnnotation} from "../../../actions";
import {connect} from "react-redux";
import ColorPicker from "../../../ColorPicker";
import imageAnnotations from "../../../reducers/imageAnnotations";

class VideoAdd extends Component{

    constructor(props) {
        super(props);
        this.colors = new ColorPicker()
    }

    render(){

        const {createAnnotation,currentTime} = this.props

        return <Fab>
            <Add onClick={() => createAnnotation(currentTime,this.colors.getColor())}/>
        </Fab>
    }
}


const mapStateToProps = ({videoControl:{currentTime}}) => ({currentTime})

const mapDispatchToProps = (dispatch) => {

    return {

        createAnnotation : (currentTime,color) => {

            dispatch(createVideoAnnotation(currentTime,color))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VideoAdd)
