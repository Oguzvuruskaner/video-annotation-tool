import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {
    moveInterpolation, deleteCanvas, placeCanvas, createCanvas, setDuration, setCurrentTime, scrollTime, updateStateTime
} from "../../actions";
import VideoController from "./VideoController";
import IntervalViewer from "../IntervalViewer";


class VideoStrategy extends Component{

    constructor(props) {
        super(props);
        this.videoRef = React.createRef()
    }

    videoFrameAction = () => {
        const { dispatchUpdateStateTime } = this.props

        const inner =  (_,{mediaTime}) =>{
            dispatchUpdateStateTime(mediaTime)
            if(this.videoRef.current !== null)
                this.videoRef.current.requestVideoFrameCallback(inner)
        }

        return inner
    }

    componentDidMount() {
        const {dispatchCreateCanvas,dispatchMoveInterpolation,dispatchScrollTime} = this.props
        const canvas = new fabric.Canvas("c")

        canvas.on("mouse:wheel", ({e}) => {
            dispatchScrollTime(e.wheelDelta)
        } )

        canvas.on("object:moving",({ target:{id,width,height,left,top} }) => {
            dispatchMoveInterpolation({
                interpolationId:id,
                xmin:left,
                xmax:left + width,
                ymin:top,
                ymax:top + height
            })
        })

        canvas.on("object:scaled",({ target:{id,left,top,height,width} }) =>  {


            dispatchMoveInterpolation({
                interpolationId:id,
                xmin:left,
                xmax:left + width,
                ymin:top,
                ymax:top + height
            })
        })
        this.videoRef.current.requestVideoFrameCallback(this.videoFrameAction())

        dispatchCreateCanvas(canvas)
    }

    onLoadedData = () => {
        const {dispatchPlaceCanvas,dispatchSetDuration} = this.props
        dispatchPlaceCanvas()
        dispatchSetDuration(this.videoRef.current.duration)
    }

    componentWillUnmount() {
        const {dispatchDeleteCanvas} = this.props
        dispatchDeleteCanvas()

    }

    render() {
        const {src} = this.props

        return <div className={"annotation-frame annotation-frame--video"}>
            <video muted={true} src={src} className={"media"} onLoadedData={this.onLoadedData} alt={"failed"} ref={this.videoRef}/>
            <canvas id={"c"} className={"annotation-frame__canvas annotation-frame_canvas--video"}/>
            <VideoController videoRef={this.videoRef}/>
            <IntervalViewer/>
        </div>

    }
}

const mapStateToProps = ({imageAnnotations}) => ({imageAnnotations})
const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteCanvas : () => dispatch(deleteCanvas()),
    dispatchCreateCanvas: (canvas) => dispatch(createCanvas(canvas)),
    dispatchPlaceCanvas : () => dispatch(placeCanvas()),
    dispatchUpdateStateTime : (currentTime) => dispatch(updateStateTime(currentTime)),
    dispatchSetDuration : (duration) => dispatch(setDuration(duration)),
    dispatchScrollTime : (deltaWheel) => dispatch(scrollTime(deltaWheel)),
    dispatchMoveInterpolation : (updatedCoords) => dispatch(moveInterpolation(updatedCoords))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoStrategy)
