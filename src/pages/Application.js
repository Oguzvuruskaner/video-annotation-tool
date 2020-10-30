import React,{Component} from "react"
import BorderboxView from "../components/BoundingBoxView"
import VideoController from "./VideoController"
import FileBarrier from "../components/FileBarrier";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import AnnotationFrame from "../components/AnnotationFrame"
import {compose} from "redux";

class Application extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        const {file} = this.props

        return <FileBarrier>
            <div className="application-page">
                <div>
                    <AnnotationFrame src={file}/>
                    <BorderboxView/>
                </div>
                <VideoController/>
            </div>
        </FileBarrier>
    }
}

const mapStateToProps = ({file},ownProps)  => {
    return {
        file
    }
}

export default compose(
    withRouter,
    connect(
        mapStateToProps
    )
)(Application)
