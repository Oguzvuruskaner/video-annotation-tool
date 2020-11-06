import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {DELETE_CANVAS, CREATE_CANVAS, PLACE_CANVAS, UPDATE_ANNOTATION} from "../actions";


class ImageStrategy extends Component{

    componentDidMount() {
        const {createCanvas,updateAnnotation} = this.props
        const canvas = new fabric.Canvas("c")

        canvas.on("object:moved",({
            target:{id,width,height,x,y}
        }) => {
            updateAnnotation({
                id,
                xmin:x,
                xmax:x + width,
                ymin:y,
                ymax:y + height
            })
        })

        canvas.on("object:scaled",({
            target:{id,x,y,width,height}
        }) => {
            updateAnnotation({
                id,
                xmin:x,
                xmax:x + width,
                ymin:y,
                ymax:y + height
            })
        })

        createCanvas(canvas)

    }

    componentWillUnmount() {
        const {deleteCanvas} = this.props
        deleteCanvas()
    }

    render() {
        const {src,placeCanvas} = this.props

        return <div className={"annotation-frame annotation-frame--image"}>
            <img className={"media"} src={src} onLoad={placeCanvas} alt={"failed"}/>
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
    }),
    updateAnnotation : ({id,xmin,xmax,ymin,ymax}) => dispatch({
        type:UPDATE_ANNOTATION,
        payload:{
            id,
            xmin,
            xmax,
            ymin,
            ymax
        }
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageStrategy)
