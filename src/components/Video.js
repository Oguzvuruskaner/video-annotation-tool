import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class Video extends Component{

    constructor(props){
        super(props)

    }

    render(){
        const {file} = this.props
        debugger

        return <video muted id={"video"}>
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

