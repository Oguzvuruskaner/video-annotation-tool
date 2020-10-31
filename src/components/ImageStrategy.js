import React,{Component} from "react"
import AnnotationViewer from "./AnnotationViewer"
import {fabric} from "fabric"
import {connect} from "react-redux"


class ImageStrategy extends Component{

    constructor(props) {
        super(props);
        this.state = {
            canvas:null
        }
    }

    componentDidMount() {
        //TODO: Think about how to pass constructed canvas to children of the ImageStrategy
        // this.setState()
        this.setState({
            canvas:new fabric.Canvas("c")
        })

    }

    componentWillUnmount() {
        this.state.canvas.clear()
        this.setState({canvas:null})
    }

    render() {
        const {src} = this.props
        return <div className={"annotation-frame annotation-frame--image"}>
            <img src={src} alt={"failed"}/>
            <canvas id={"c"} className={"annotation-frame__canvas annotation-frame_canvas--image"}/>
        </div>

    }
}

const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})

export default connect(mapStateToProps)(ImageStrategy)
