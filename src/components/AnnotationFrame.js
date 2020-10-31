import React,{Component,createRef} from "react"
import {connect} from "react-redux";
import ImageStrategy from "./ImageStrategy"
import VideoStrategy from "./VideoStrategy"
import {PLACE_CANVAS} from "../actions";

class AnnotationFrame extends Component{
    constructor(props) {
        super(props);
        this.videoRef = createRef()
        this.resizeListener = null
    }

    componentDidMount() {
        const {dispatch} = this.props
        this.resizeListener = window.addEventListener("resize", () => {
            dispatch({type:PLACE_CANVAS})
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize",this.resizeListener)
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


