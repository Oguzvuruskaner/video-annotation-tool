import React,{Component} from "react"
import {connect} from "react-redux"
import {SET_TIME, UPDATE_TIME} from "../../../actions";

class VideoSlider extends Component{

    constructor(props) {
        super(props)
        this.sliderRef = React.createRef()
        this.state = {
            mouseoverFill:0
        }
    }

    componentDidMount(){

        const {current} = this.sliderRef

        current.addEventListener("mousemove",(event)=>{

            this.setState({
                mouseoverFill:event.clientX/current.clientWidth
            })
        })

        current.addEventListener("mouseleave",() => {
            this.setState({mouseoverFill:0})
        })



    }

    onThumbnailClick = (event) => {
        const {duration,setTime} = this.props
        const {current} = this.sliderRef

        setTime(Math.min(duration,event.clientX/current.clientWidth*duration))
    }


    componentWillUnmount() {
        document.body.style.cursor = "default"
    }

    render() {
        const {src,currentTime,duration} = this.props
        const {mouseoverFill} = this.state

        const progressStyle = {
            width:`${currentTime/duration*100}%`
        }

        const thumbnailStyle = {
            width:`${mouseoverFill * 100}%`
        }

        return <div ref={this.sliderRef} onClick={this.onThumbnailClick} className={"video-controller__video-slider"}>
            <div style={ progressStyle } className={"video-controller__video-slider__watch-progress"}/>
            <div  style={ thumbnailStyle }  className={"video-controller__video-slider__thumbnail"}/>
            <video autoPlay={false} src={src} className={"video-controller__video-slider__inner-video"}/>
        </div>
    }
}

const mapStateToProps = ({file:{content},videoControl:{currentTime,duration}}) => ({
    src:content,
    currentTime,
    duration
})

const mapDispatchToProps = (dispatch) => ({
    setTime : (currentTime) => dispatch({
        type:SET_TIME,
        payload:currentTime
    })
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoSlider)
