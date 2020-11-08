import React from "react"
import {closeDrawer} from "../../actions";
import {connect} from "react-redux"
import {Fab} from "@material-ui/core";
import {Close} from "@material-ui/icons"

const CloseDrawer = ({close}) => {

    return <Fab className="drawer__close" onClick={close}>
        <Close/>
    </Fab>
}

const mapDispatchToProps = (dispatch) => ({
    close : () => dispatch(closeDrawer())
})

export default connect(null,mapDispatchToProps)(CloseDrawer)
