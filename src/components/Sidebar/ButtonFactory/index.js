import React from "react"
import {connect} from "react-redux"

import AddImageAnnotation from "./imageButtons/AddImageAnnotation";
import ImageSave from "./imageButtons/ImageSave";
import CloseButton from "./CloseButton";

import VideoSave from "./videoButtons/VideoSave";
import AddVideoAnnotation from "./videoButtons/AddVideoAnnotation";

const ButtonFactory = ({type}) => {
    if(type.includes("image"))
        return <>
            <AddImageAnnotation/>
            <CloseButton/>
            <ImageSave/>
        </>
    else
        return <>
            <AddVideoAnnotation/>
            <CloseButton/>
            <VideoSave/>
        </>
}

const mapStateToProps = ({file}) => ({
    type:file.type
})

export default connect(mapStateToProps)(ButtonFactory)
