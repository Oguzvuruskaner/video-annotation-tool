import React from "react"
import {connect} from "react-redux"

import ImageAdd from "./imageButtons/ImageAdd";
import ImageSave from "./imageButtons/ImageSave";
import CloseButton from "./CloseButton";

import VideoAdd from "./videoButtons/VideoAdd";
import VideoSave from "./videoButtons/VideoSave";

const ButtonFactory = ({type}) => {
    if(type.includes("image"))
        return <>
            <ImageSave/>
            <CloseButton/>
            <ImageAdd/>
        </>
    else
        return <>
            <VideoSave/>
            <CloseButton/>
            <VideoAdd/>
        </>
}

const mapStateToProps = ({file}) => ({
    type:file.type
})

export default connect(mapStateToProps)(ButtonFactory)
