import React,{Component} from "react"
import {connect} from "react-redux"
import {SET_TIME} from "../../../actions";

class VideoSlider extends Component{

    constructor(props) {
        super(props)
        this.sliderRef = React.createRef()
        this.innerVideoRef = React.createRef()

        this.state = {
            viewX:0,
            mouseoverFill:0
        }
    }

    componentDidMount(){

        const {current} = this.sliderRef

        current.addEventListener("mousemove",(event)=>{
            const {duration} = this.innerVideoRef.current

            this.innerVideoRef.current.currentTime = event.clientX/current.clientWidth*duration

            this.setState({
                mouseoverFill:event.clientX/current.clientWidth,
                viewX:Math.min(current.clientWidth-320,event.clientX)
            })
        })

        current.addEventListener("mouseleave",() => {
            this.setState({mouseoverFill:0,viewX:0})
        })



    }

    onThumbnailClick = (event) => {
        const {setTime} = this.props
        const {current} = this.sliderRef
        const {duration} = this.innerVideoRef.current

        setTime(Math.min(duration,event.clientX/current.clientWidth*duration))
    }


    componentWillUnmount() {
        document.body.style.cursor = "default"
    }

    render() {
        const {duration} = this.innerVideoRef.current || 0
        const {src,currentTime} = this.props
        const {mouseoverFill,viewX} = this.state

        const progressStyle = {
            width:`${currentTime/duration*100}%`
        }

        const thumbnailStyle = {
            width:`${mouseoverFill * 100}%`
        }

        const innerVideoStyle = {
            display:(mouseoverFill === 0) ? "none" : "block",
            left:viewX
        }

        return <div ref={this.sliderRef} onClick={this.onThumbnailClick} className={"video-controller__video-slider"}>
            <div style={ progressStyle } className={"video-controller__video-slider__watch-progress"}/>
            <div  style={ thumbnailStyle }  className={"video-controller__video-slider__thumbnail"}/>
            <div style={innerVideoStyle} className={"video-controller__video-slider__inner-video"}>
                <video ref={this.innerVideoRef}  autoPlay={false} src={src} className={"video-controller__video-slider__inner-video__media"}/>
            </div>
        </div>
    }
}

const mapStateToProps = ({file:{content},videoControl:{currentTime}}) => ({
    src:content,
    currentTime
})

const mapDispatchToProps = (dispatch) => ({
    setTime : (currentTime) => dispatch({
        type:SET_TIME,
        payload:currentTime
    })
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoSlider)
