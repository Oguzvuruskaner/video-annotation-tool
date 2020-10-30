import React,{Component} from "react"
import {connect} from "react-redux"
import BoundaryBox from "./BoundingBox";

class AnnotationViewer extends Component{

    render() {

        const {imageAnnotations} = this.props

        return (
            null
        );
    }
}


const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})

export default connect(mapStateToProps)(AnnotationViewer)
