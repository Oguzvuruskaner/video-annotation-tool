import React,{Component,createRef} from "react"
import {connect} from "react-redux";
import ImageStrategy from "./ImageStrategy"
import VideoStrategy from "./VideoStrategy"

class AnnotationFrame extends Component{
    constructor(props) {
        super(props);
        this.videoRef = createRef()
    }



    render(){
        const {src:{content,type}} = this.props

        if(type.includes("image"))
            return <ImageStrategy src={content}/>
        else
            return <VideoStrategy src={content} ref={this.videoRef}/>

    }
}




export default connect()(AnnotationFrame)


