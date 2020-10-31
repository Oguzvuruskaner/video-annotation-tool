import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class VideoStrategy extends Component{

    componentDidMount() {
        const {ref} = this.props
    }

    render(){
        const {src,ref} = this.props
        return <video ref={ref} autoPlay={false} src={src} muted id={"video"}>
            </video>
    }

}

const mapStateToProps = ({file}) => {

    return {
        file
    }
}


export default compose(
    withRouter,
    connect(mapStateToProps)
)(VideoStrategy)

