import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {CREATE_IMAGE_ANNOTATION, createImageAnnotation} from "../../../../actions";
import {connect} from "react-redux";
import ColorPicker from "../../../../ColorPicker";

const AddImageAnnotation = ({dispatchCreateImageAnnotation}) => {

    return <Fab onClick={dispatchCreateImageAnnotation}>
        <Add/>
    </Fab>
}


const mapDispatchToProps = (dispatch) => {

    return {
        dispatchCreateImageAnnotation : () => dispatch(createImageAnnotation())
    }
}


export default connect(null,mapDispatchToProps)(AddImageAnnotation)
