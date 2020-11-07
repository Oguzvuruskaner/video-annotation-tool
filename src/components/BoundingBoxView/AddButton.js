import React, {Component} from "react"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {ADD_ANNOTATION} from "../../actions";
import {connect} from "react-redux";
import ColorPicker from "../../ColorPicker";
import imageAnnotations from "../../reducers/imageAnnotations";

class AddButton extends Component{

    constructor(props) {
        super(props);
        this.colors = new ColorPicker()
    }

    render(){

        const {createBoundingBox,id} = this.props

        return <Fab>
            <Add onClick={() => createBoundingBox(this.colors.getColor(),id)}/>
        </Fab>
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        createBoundingBox : (color,id) => {
            dispatch({
                type:ADD_ANNOTATION,
                payload:{
                    xmin:0,
                    ymin:0,
                    xmax:100,
                    ymax:100,
                    color,
                    id
                }
            })
        }
    }
}

const mapStateToProps = ({imageAnnotations}) => {

    return {
        id:imageAnnotations.counter
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddButton)
