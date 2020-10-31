import React,{Component} from "react";
import {withRouter} from "react-router"
import {compose} from "redux";
import {connect} from "react-redux"
import {Fab} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {CLOSE_FILE} from "../../actions";

class CloseButton extends Component{

    render() {

        const {closeFile} = this.props

        return (
            <Fab onClick={() => closeFile()}>
                <Close/>
            </Fab>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeFile: () => dispatch({
            type:CLOSE_FILE
        })
    }
}


export default compose(
    withRouter,
    connect(null,mapDispatchToProps)
)(CloseButton)
