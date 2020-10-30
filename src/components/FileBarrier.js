import React,{Component} from "react"
import {withRouter} from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";

class FileBarrier extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {history,file} = this.props
        if (file == null)
            history.push("/")

    }

    render() {
        const {children,file} = this.props

        if(file == null)
            return null
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
