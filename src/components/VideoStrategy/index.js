import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {DELETE_CANVAS, CREATE_CANVAS, PLACE_CANVAS,UPDATE_TIME, SET_DURATION,UPDATE_ANNOTATION} from "../../actions";
import VideoController from "./VideoController";


class VideoStrategy extends Component{

    constructor(props) {
        super(props);
        this.videoRef = React.createRef()
    }

    videoFrameAction = () => {
        const { updateTime } = this.props

        const inner =  (_,{mediaTime}) =>{
            updateTime(mediaTime)

            if(this.videoRef.current !== null)
                this.videoRef.current.requestVideoFrameCallback(inner)
        }

        return inner
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
        this.videoRef.current.requestVideoFrameCallback(this.videoFrameAction())

        createCanvas(canvas)
    }

    onLoadedData = () => {
        const {placeCanvas,setDuration} = this.props
        placeCanvas()
        setDuration(this.videoRef.current.duration)
    }

    componentWillUnmount() {
        const {deleteCanvas} = this.props
        deleteCanvas()

    }

    render() {
        const {src} = this.props

        return <div className={"annotation-frame annotation-frame--video"}>
            <video muted={true} src={src} className={"media"} onLoadedData={this.onLoadedData} alt={"failed"} ref={this.videoRef}/>
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
    updateTime : (currentTime) => dispatch({
        type:UPDATE_TIME,
        payload:currentTime
    }),
    setDuration : (duration) => dispatch({
        type:SET_DURATION,
        payload:duration
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
