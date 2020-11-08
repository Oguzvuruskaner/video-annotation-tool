import React from "react"
import {connect} from "react-redux"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons"
import {createInterpolation} from "../../actions/video";


const AddInterval = ({intervalId,dispatchCreateInterpolation}) => {

    return <Fab onClick={() => dispatchCreateInterpolation(intervalId)}>
        <Add/>
    </Fab>
}

const mapDispatchToProps = (dispatch) => ({
    dispatchCreateInterpolation : (intervalId) => dispatch(createInterpolation(intervalId))
})

export default connect(null,mapDispatchToProps)(AddInterval)
