import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {DELETE_CANVAS,CREATE_CANVAS,PLACE_CANVAS} from "../actions";


class ImageStrategy extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {createCanvas} = this.props
        const canvas = new fabric.Canvas("c")
        createCanvas(canvas)


    }

    componentWillUnmount() {
        const {deleteCanvas} = this.props
        deleteCanvas()
    }

    render() {
        const {src,placeCanvas} = this.props

        return <div className={"annotation-frame annotation-frame--image"}>
            <img src={src} onLoad={() => placeCanvas()} alt={"failed"}/>
            <canvas id={"c"} className={"annotation-frame__canvas annotation-frame_canvas--image"}/>
        </div>

    }
}

const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})
const mapDispatchToProps = (dispatch) => ({
    deleteCanvas : () => dispatch({
        type:DELETE_CANVAS,
        payload:null
    }),
    createCanvas: (canvas) => dispatch({
        type:CREATE_CANVAS,
        payload:canvas
    }),
    placeCanvas : () => dispatch({
        type:PLACE_CANVAS
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageStrategy)
