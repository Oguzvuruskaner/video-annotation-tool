import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {DELETE_CANVAS, CREATE_CANVAS, PLACE_CANVAS, UPDATE_ANNOTATION} from "../actions";
import VideoController from "./VideoController";

// {expectedDisplayTime: 116569.85000000002, height: 240, mediaTime: 1.34356, presentationTime: 116553.31500000002, presentedFrames: 41, …}
// expectedDisplayTime: 116569.85000000002
// height: 240
// mediaTime: 1.34356
// presentationTime: 116553.31500000002
// presentedFrames: 41
// processingDuration: 0.0005
// width: 320

class VideoStrategy extends Component{

    constructor(props) {
        super(props);
        this.videoRef = React.createRef()
    }

    videoFrameAction = (_,metadata) =>{

        const {presentedFrames} = metadata

        if(this.videoRef.current !== null)
            this.videoRef.current.requestVideoFrameCallback(this.videoFrameAction)
    }

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
        this.videoRef.current.requestVideoFrameCallback(this.videoFrameAction)

        createCanvas(canvas)
    }

    componentWillUnmount() {
        const {deleteCanvas} = this.props
        deleteCanvas()

    }

    render() {
        const {src,placeCanvas} = this.props

        return <div className={"annotation-frame annotation-frame--video"}>
            <video muted={true} src={src} className={"media"} onLoadedData={placeCanvas} alt={"failed"} ref={this.videoRef}/>
            <canvas id={"c"} className={"annotation-frame__canvas annotation-frame_canvas--video"}/>
            <VideoController videoRef={this.videoRef}/>
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
)(VideoStrategy)
