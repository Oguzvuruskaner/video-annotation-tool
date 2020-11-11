import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ADD_ANNOTATION, CREATE_VIDEO_ANNOTATION, createVideoAnnotation} from "../../../../actions";
import {connect} from "react-redux";
import ColorPicker from "../../../../utils/ColorPicker";
import imageAnnotations from "../../../../reducers/imageAnnotations";

const AddVideoAnnotation = ({dispatchCreateVideoAnnotation}) => {
    return <Fab onClick={dispatchCreateVideoAnnotation}>
        <Add />
    </Fab>
}


const mapDispatchToProps = (dispatch) => ({
    dispatchCreateVideoAnnotation : () => dispatch(createVideoAnnotation())
})

export default connect(null,mapDispatchToProps)(AddVideoAnnotation)
