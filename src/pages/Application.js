import React,{Component} from "react"
import Sidebar from "../components/Sidebar"
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
            <div className="application">
                <AnnotationFrame src={file}/>
                <Sidebar/>
            </div>
        </FileBarrier>
    }
}

const mapStateToProps = ({file})  => ({file})

export default compose(
    withRouter,
    connect(
        mapStateToProps
    )
)(Application)
