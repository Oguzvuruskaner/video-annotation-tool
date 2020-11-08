import React from "react"
import {connect} from "react-redux"
import {Fab} from "@material-ui/core"
import {deleteVideoAnnotation} from "../../../../actions";
import {OPEN_DRAWER} from "../../../../actions/video/drawer";


const Button = ({deleteAnnotation,openDrawer,id}) => {

    // On left click open annotation menu
    return <Fab className={"annotation-viewer__element"}  onClick={openDrawer} onContextMenu={deleteAnnotation}>
        {id}
    </Fab>
}

const mapDispatchToProps = (dispatch,{id}) => ({
    deleteAnnotation : (event) => {
        event.preventDefault()
        dispatch(deleteVideoAnnotation(id))
    },
    openDrawer:() => dispatch({type:OPEN_DRAWER,payload:id})
})


export default connect(null,mapDispatchToProps)(Button)
