import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ADD_ANNOTATION} from "../../actions";
import {connect} from "react-redux";
import ColorPicker from "../../ColorPicker";

class AddButton extends Component{

    constructor(props) {
        super(props);
        this.colors = new ColorPicker()
    }


    render(){

        const {createBoundingBox} = this.props

        return <Fab>
            <Add onClick={() => createBoundingBox(this.colors.getColor())}/>
        </Fab>
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        createBoundingBox : (color) => {
            dispatch({
                type:ADD_ANNOTATION,
                payload:{
                    xmin:0,
                    ymin:0,
                    xmax:100,
                    ymax:100,
                    color
                }
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(AddButton)
