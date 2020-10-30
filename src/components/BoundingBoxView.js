import React,{Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router";
import {compose} from "redux";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons"
import {ADD_ANNOTATION} from "../actions"

class BoundingBoxView extends Component{

    render() {

        const {createBoundingBox} = this.props

        return <div className={"bounding-box-view"}>
            <Fab>
                <Add onClick={createBoundingBox}/>
            </Fab>
        </div>

    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        createBoundingBox : () => {
            dispatch({
                type:ADD_ANNOTATION,
                payload:{
                    xmin:0,
                    ymin:0,
                    xmax:100,
                    ymax:100
                }
            })
        }
    }
}

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(BoundingBoxView)
