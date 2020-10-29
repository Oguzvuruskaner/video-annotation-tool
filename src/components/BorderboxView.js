import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";

class BorderboxView extends Component{

    render() {
        return null
    }
}

export default compose(
    withRouter,
    connect()
)(BorderboxView)
