import React from "react"
import {connect} from "react-redux"
import {Fab} from "@material-ui/core"
import {deleteVideoAnnotation} from "../../../../actions";


const Button = ({deleteAnnotation,id}) => {

    // On left click open annotation menu
    return <Fab  onContextMenu={deleteAnnotation}>
        {id}
    </Fab>
}

const mapDispatchToProps = (dispatch,{id}) => ({
    deleteAnnotation : (event) => {
        event.preventDefault()
        dispatch(deleteVideoAnnotation(id))
    }
})


export default connect(null,mapDispatchToProps)(Button)
