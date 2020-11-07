import React,{Component} from "react"
import {connect} from "react-redux";

class VideoAnnotations extends Component{


    render() {
        return null
    }
}


const mapStateToProps = ({videoAnnotations}) => ({videoAnnotations})

export default connect(mapStateToProps)(VideoAnnotations)
