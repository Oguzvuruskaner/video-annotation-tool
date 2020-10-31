import React,{Component} from "react"
import {Redirect, withRouter} from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";

class FileBarrier extends Component{

    render() {
        const {children,file} = this.props

        if(file == null){
            return <Redirect to="/"/>
        }
        else
            return <>
                {children}
                </>
    }
}

const mapStateToProps = ({file}) => ({
    file
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(FileBarrier)
