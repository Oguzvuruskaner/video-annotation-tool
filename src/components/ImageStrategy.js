import React,{Component} from "react"
import AnnotationViewer from "./AnnotationViewer"
import {fabric} from "fabric"
import {connect} from "react-redux"


class ImageStrategy extends Component{

    constructor(props) {
        super(props);
        this.canvas = null
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas("c")
    }

    componentWillUnmount() {
        this.canvas.clear()
        delete this.canvas
    }

    render() {
        const {src} = this.props
        return <div className={"annotation-frame annotation-frame--image"}>
            <img src={src} alt={"failed"}/>
            <canvas id={"annotation-frame_canvas annotation-frame_canvas--image"}/>
        </div>

    }
}

const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})

export default connect(mapStateToProps)(ImageStrategy)
