import React from "react"
import {connect} from "react-redux"
import ImageAnnotations from "./ImageAnnotations"
import VideoAnnotations from "./VideoAnnotations"


const Container = ({children}) => <div className={"annotation-viewer"}>{children}</div>

const AnnotationViewer = ({type}) => {

    if(type.includes("image"))
        return <Container><ImageAnnotations/></Container>
    else
        return <Container><VideoAnnotations/></Container>
}

const mapStateToProps = ({file:{type}}) => ({
    type,
})

export default connect(mapStateToProps)(AnnotationViewer)
