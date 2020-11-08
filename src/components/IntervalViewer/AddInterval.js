import React from "react"
import {connect} from "react-redux"
import {createInterval} from "../../actions"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons"

const AddInterval = ({annotationId,dispatchCreateInterval}) => {

    return <Fab onClick={() => dispatchCreateInterval(annotationId)}>
        <Add/>
    </Fab>
}

const mapStateToProps = ({drawer}) => ({annotationId:drawer})

const mapDispatchToProps = (dispatch) => ({
    dispatchCreateInterval : (annotationId) => dispatch(createInterval(annotationId))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddInterval)
