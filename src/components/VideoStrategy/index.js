import React,{Component} from "react"
import {fabric} from "fabric"
import {connect} from "react-redux"
import {
    DELETE_CANVAS,
    CREATE_CANVAS,
    PLACE_CANVAS,
    UPDATE_TIME,
    SET_DURATION,
    moveInterpolation, deleteCanvas, placeCanvas, createCanvas, setDuration
} from "../../actions";
import VideoController from "./VideoController";
import IntervalViewer from "../IntervalViewer";
import {updateTime} from "../../actions/video";


class VideoStrategy extends Component{

    constructor(props) {
        super(props);
        this.videoRef = React.createRef()
    }

    videoFrameAction = () => {
        const { dispatchUpdateTime } = this.props

        const inner =  (_,{mediaTime}) =>{
            dispatchUpdateTime(mediaTime)

            if(this.videoRef.current !== null)
                this.videoRef.current.requestVideoFrameCallback(inner)
        }

        return inner
    }

    componentDidMount() {
        const {dispatchCreateCanvas,dispatchMoveInterpolation} = this.props
        const canvas = new fabric.Canvas("c")


        canvas.on("object:moved",({
                                      target:{id,width,height,x,y}
                                  }) => {

            dispatchMoveInterpolation({
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
            dispatchMoveInterpolation({
                id,
                xmin:x,
                xmax:x + width,
                ymin:y,
                ymax:y + height
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
    dispatchUpdateTime : (currentTime) => dispatch(updateTime(currentTime)),
    dispatchSetDuration : (duration) => dispatch(setDuration(duration)),
    dispatchMoveInterpolation : (updatedCoords) => dispatch(moveInterpolation(updatedCoords))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoStrategy)
