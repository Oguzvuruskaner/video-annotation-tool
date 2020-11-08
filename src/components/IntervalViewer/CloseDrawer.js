import React from "react"
import {closeDrawer} from "../../actions";
import {connect} from "react-redux"
import {Fab} from "@material-ui/core";
import {Close} from "@material-ui/icons"

const CloseDrawer = ({dispatchCloseDrawer}) => {

    return <Fab className="drawer__close" onClick={dispatchCloseDrawer}>
        <Close/>
    </Fab>
}

const mapDispatchToProps = (dispatch) => ({
    dispatchCloseDrawer : () => dispatch(closeDrawer())
})

export default connect(null,mapDispatchToProps)(CloseDrawer)
