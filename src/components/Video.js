import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class Video extends Component{


    render(){
        const {file} = this.props
        debugger
        return <video id={"video"}>
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
)(Video)

