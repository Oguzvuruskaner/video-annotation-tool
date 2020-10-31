import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ADD_ANNOTATION} from "../../actions";
import {connect} from "react-redux";

class AddButton extends Component{

    render(){

        const {createBoundingBox} = this.props

        return <Fab>
            <Add onClick={createBoundingBox}/>
        </Fab>
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

export default connect(null,mapDispatchToProps)(AddButton)
