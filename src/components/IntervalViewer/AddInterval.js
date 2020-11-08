import React from "react"
import {connect} from "react-redux"
import {createInterval} from "../../actions"
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons"

const AddInterval = ({drawer,dispatchCreateInterval}) => {

    return <Fab onClick={() => dispatchCreateInterval(drawer)}>
        <Add/>
    </Fab>
}

const mapStateToProps = ({drawer}) => ({drawer})

const mapDispatchToProps = (dispatch) => ({
    dispatchCreateInterval : (id) => dispatch(createInterval(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddInterval)
