import React,{Component} from "react"
import {connect} from "react-redux";
import Button from "./Button";

class VideoAnnotations extends Component{


    render() {

        const {videoAnnotations} = this.props
        const annotations = Object.entries(videoAnnotations).filter(([key,value]) => key !== "counter")


        return <>
            {
                annotations.map(([key,value]) => <Button key={key} id={key} {...value}/>)
            }
        </>
    }
}


const mapStateToProps = ({videoAnnotations}) => ({videoAnnotations})

export default connect(mapStateToProps)(VideoAnnotations)
